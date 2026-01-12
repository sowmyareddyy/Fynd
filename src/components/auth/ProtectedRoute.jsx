import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requireWorker = false, requireCustomer = false }) => {
  const { isAuthenticated, isWorker, isCustomer } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireWorker && !isWorker) {
    return <Navigate to="/home" replace />;
  }

  if (requireCustomer && !isCustomer) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
