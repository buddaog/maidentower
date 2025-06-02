import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = localStorage.getItem('adminAuth') === 'true';
  return isAuth ? children : <Navigate to="/adminlogin" replace />;
};

export default ProtectedRoute;
