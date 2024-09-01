import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const DriverProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user.role !== 'driver') {
    return <Navigate to="/driver-login" />;
  }

  return <Outlet />;
};

export default DriverProtectedRoute;
