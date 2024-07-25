import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isTokenExpired, refreshAccessToken } from "../../../utils";

//esto solo funciona para el layout de auth o sea el path login y signup
export function AuthLayout() {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(true);
  useEffect(() => {
    // Verifica si el token de acceso está presente y no ha expirado
    const token = localStorage.getItem("accessToken");
    if (!token || isTokenExpired(token)) {
      if (!refreshAccessToken()){
        navigate("/login");
        return;
      }
    }
    // Verifica si el token de refresco ha expirado
    const refreshToken = localStorage.getItem("refreshToken");
    if (isTokenExpired(refreshToken)) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
      return;
    }
    // si el token de acceso no ha expirado ni el refresh token, muestra la página
    setShowPage(true);
    navigate("/");
  }, [navigate]);

  return <div className="h-full min-h-screen overflow-hidden">{showPage && <Outlet />}</div>;
}
