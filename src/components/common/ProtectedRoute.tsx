import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('idToken'); // ¿cambiar a localStorage ?

  if (!isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
