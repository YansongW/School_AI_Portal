import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

interface RouteGuardProps {
  requiredRoles?: string[];
  requireAuth?: boolean;
}

export const withRouteGuard = (
  WrappedComponent: React.ComponentType,
  { requiredRoles = [], requireAuth = true }: RouteGuardProps
) => {
  return function WithRouteGuard(props: any) {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.currentUser);

    React.useEffect(() => {
      if (requireAuth && !user) {
        navigate('/login', { state: { from: location }, replace: true });
        return;
      }

      if (requiredRoles.length > 0 && 
          !requiredRoles.some(role => user?.role.includes(role))) {
        navigate('/403', { replace: true });
        return;
      }
    }, [user, location, navigate]);

    if (requireAuth && !user) return null;
    if (requiredRoles.length > 0 && 
        !requiredRoles.some(role => user?.role.includes(role))) return null;

    return <WrappedComponent {...props} />;
  };
}; 