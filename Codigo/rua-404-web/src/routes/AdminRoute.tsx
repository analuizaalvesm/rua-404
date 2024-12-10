import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type RoleProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole: string;
};

const AdminRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated() || role !== requiredRole) {
    return <Navigate to="/store" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
