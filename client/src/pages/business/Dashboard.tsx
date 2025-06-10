import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

interface DashboardStats {
  totalCourts: number;
  totalRevenue: number;
  averageRating: number;
}

const BusinessDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/business/dashboard', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setStats(data.data.stats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Business Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Total Courts
            </Typography>
            <Typography variant="h3">
              {stats?.totalCourts || 0}
            </Typography>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Total Revenue
            </Typography>
            <Typography variant="h3">
              ${stats?.totalRevenue?.toFixed(2) || '0.00'}
            </Typography>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Average Rating
            </Typography>
            <Typography variant="h3">
              {stats?.averageRating?.toFixed(1) || '0.0'}
            </Typography>
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Revenue Overview
            </Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Jan', revenue: 4000 },
                    { name: 'Feb', revenue: 3000 },
                    { name: 'Mar', revenue: 2000 },
                    { name: 'Apr', revenue: 2780 },
                    { name: 'May', revenue: 1890 },
                    { name: 'Jun', revenue: 2390 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessDashboard; 