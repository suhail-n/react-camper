import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.user ? (
    // return the nested routes children if user is authenticated
    <Outlet />
  ) : (
    // navigate to /login if the user is not authenticated. replace will empty the history stack to prevent the back button
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
