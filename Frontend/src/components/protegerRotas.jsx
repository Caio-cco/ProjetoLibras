import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");

  if (!token) {

    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwt_decode(token);
    const now = Date.now() / 1000;


    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem("authToken");
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (err) {
    localStorage.removeItem("authToken");
    return <Navigate to="/login" replace />;
  }
}