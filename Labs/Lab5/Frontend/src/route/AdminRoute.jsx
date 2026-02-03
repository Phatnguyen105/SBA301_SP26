import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
const user = JSON.parse(localStorage.getItem("lab2_user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AdminRoute;
