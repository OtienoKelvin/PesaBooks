import { Navigate } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = true; //useAuth();

  if (loading) return null; // or spinner later

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
