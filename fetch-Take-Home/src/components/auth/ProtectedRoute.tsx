import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { API_BASE_URL } from "../../apis";

const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/dogs/breeds`, {
      method: "GET",
      credentials: "include",
    });

    return response.ok;
  } catch {
    return false;
  }
};

export const ProtectedRoute = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setIsAuth(authenticated);
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  if (!authChecked) return null;

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};
