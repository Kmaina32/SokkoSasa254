import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'shared/contexts/AuthContext.jsx'; // Updated path
import { Spinner } from 'shared/ui/spinner.jsx'; // Updated path

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, roles, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const hasRequiredRole = allowedRoles.some(role => roles.includes(role));

  if (!hasRequiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;