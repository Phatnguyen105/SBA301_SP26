import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireRole = ({ allowAdmin, allowStaff, children }) => {
  const { isAdmin, isStaff } = useAuth();

  if (
    (allowAdmin && isAdmin) ||
    (allowStaff && isStaff)
  ) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default RequireRole;
