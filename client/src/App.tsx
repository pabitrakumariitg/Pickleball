import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Layouts
import BusinessLayout from './components/layouts/BusinessLayout';

// Pages
import BusinessDashboard from './pages/business/Dashboard';
import BusinessRegister from './pages/business/Register';
import Courts from './pages/business/Courts';
import Bookings from './pages/business/Bookings';

// Auth
import { AuthProvider, useAuth } from './contexts/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/business/register" element={<BusinessRegister />} />

            {/* Protected Business Routes */}
            <Route
              path="/business"
              element={
                <PrivateRoute>
                  <BusinessLayout />
                </PrivateRoute>
              }
            >
              <Route path="dashboard" element={<BusinessDashboard />} />
              <Route path="courts" element={<Courts />} />
              <Route path="bookings" element={<Bookings />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/business/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; 