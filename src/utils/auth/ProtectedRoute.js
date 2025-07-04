// src/components/auth/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useUserRoles } from '../hooks/useUserRoles';

export default function ProtectedRoute({ children }) {
  const { loading, isAdmin, isAdminVentas, roles } = useUserRoles();

  if (loading) return null; // O un spinner de carga

  console.log('isAdmin:', isAdmin, 'isAdminVentas:', isAdminVentas, 'Roles: ', roles)

  if (isAdmin || isAdminVentas) {
    return children;
  }

  return <Navigate to="/no-permitido" replace />;

}
