import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('idToken');

  if (!isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (isAuthenticated && location.pathname === '/') return <Navigate to='/home' replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
