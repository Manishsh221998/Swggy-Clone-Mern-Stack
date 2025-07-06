import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem('userToken');
  
  if (!token) {
    // If no token, redirect to home page
    return <Navigate to="/" replace />;
  }
  
  // If token exists, render the child components
  return children;
};

export default ProtectedRoute;