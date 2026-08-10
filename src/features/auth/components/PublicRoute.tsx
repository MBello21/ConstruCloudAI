import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { SplashScreen } from "../../../shared/components/SplashScreen";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/panel" replace />;
  }

  return <>{children}</>;
};
