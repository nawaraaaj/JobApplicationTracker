import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../lib/Auth/AuthContext";

export function AuthRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated
    ? <Navigate to="/dashboard" replace />
    : <Outlet />;
}