import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import React from "react";
import Example from "./components/ui/Loader";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Example/>; // wait while checking token
  if (!user) return <Navigate to="/login" replace />; // if no user → redirect

  return children; // authorized → show page
};

export default ProtectedRoute;
