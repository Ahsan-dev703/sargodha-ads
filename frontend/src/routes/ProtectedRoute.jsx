import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/ui/Spinner/Spinner";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
