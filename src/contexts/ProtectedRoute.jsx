import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // o '@contexts/AuthContext' si usás alias

export default function ProtectedRoute({ redirectTo = '/login' }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
