import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2)
}));

interface Court {
  _id: string;
  name: string;
  location: string;
  price: {
    member: number;
    nonMember: number;
  };
  availability: {
    startTime: string;
    endTime: string;
  };
}

const Courts: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    memberPrice: '',
    nonMemberPrice: '',
    startTime: '',
    endTime: ''
  });

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const response = await fetch('/api/business/courts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setCourts(data.data.courts);
    } catch (err) {
      setError('Failed to fetch courts');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (court?: Court) => {
    if (court) {
      setSelectedCourt(court);
      setFormData({
        name: court.name,
        location: court.location,
        memberPrice: court.price.member.toString(),
        nonMemberPrice: court.price.nonMember.toString(),
        startTime: court.availability.startTime,
        endTime: court.availability.endTime
      });
    } else {
      setSelectedCourt(null);
      setFormData({
        name: '',
        location: '',
        memberPrice: '',
        nonMemberPrice: '',
        startTime: '',
        endTime: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourt(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const courtData = {
        name: formData.name,
        location: formData.location,
        price: {
          member: parseFloat(formData.memberPrice),
          nonMember: parseFloat(formData.nonMemberPrice)
        },
        availability: {
          startTime: formData.startTime,
          endTime: formData.endTime
        }
      };

      const url = selectedCourt
        ? `/api/business/court/${selectedCourt._id}`
        : '/api/business/court';
      
      const method = selectedCourt ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(courtData)
      });

      if (!response.ok) {
        throw new Error('Failed to save court');
      }

      handleCloseDialog();
      fetchCourts();
    } catch (err) {
      setError('Failed to save court');
    }
  };

  const handleDelete = async (courtId: string) => {
    if (window.confirm('Are you sure you want to delete this court?')) {
      try {
        const response = await fetch(`/api/business/court/${courtId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete court');
        }

        fetchCourts();
      } catch (err) {
        setError('Failed to delete court');
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4">Manage Courts</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
          >
            Add New Court
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {courts.map((court) => (
            <Grid item xs={12} key={court._id}>
              <StyledCard>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6">{court.name}</Typography>
                    <Typography color="textSecondary">{court.location}</Typography>
                    <Typography>
                      Member Price: ${court.price.member} | Non-Member Price: ${court.price.nonMember}
                    </Typography>
                    <Typography>
                      Hours: {court.availability.startTime} - {court.availability.endTime}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleOpenDialog(court)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(court._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedCourt ? 'Edit Court' : 'Add New Court'}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Court Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Member Price"
                    type="number"
                    value={formData.memberPrice}
                    onChange={(e) => setFormData({ ...formData, memberPrice: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Non-Member Price"
                    type="number"
                    value={formData.nonMemberPrice}
                    onChange={(e) => setFormData({ ...formData, nonMemberPrice: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Start Time"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="End Time"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                {selectedCourt ? 'Update' : 'Add'} Court
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Courts; 