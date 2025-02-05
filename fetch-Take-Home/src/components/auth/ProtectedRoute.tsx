import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return document.cookie.includes("fetch-access-token");
};

export const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};
