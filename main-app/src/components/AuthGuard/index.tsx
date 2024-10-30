import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRoles = [] }) => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const userRoles = user?.role || [];

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.some(role => userRoles.includes(role))) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard; 