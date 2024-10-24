import { useAuth } from "../src/store/ContextProvider";
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Checking user info...</p>;

  return user && user.publicId ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
