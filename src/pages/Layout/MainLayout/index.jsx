import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../../../components/shared";
import { isTokenExpired,refreshAccessToken } from "../../../utils";

export function MainLayout() {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    // Verifica si el token de acceso está presente y no ha expirado
    const token = localStorage.getItem("accessToken");
    if (!token || isTokenExpired(token)) {
      if (!refreshAccessToken()){
        navigate("/login");
      }
    }
    // Verifica si el token de refresco ha expirado
    const refreshToken = localStorage.getItem("refreshToken");
    if (isTokenExpired(refreshToken)) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
    // si el token de acceso no ha expirado ni el refresh token, muestra la página
    setShowPage(true);
  }, [navigate]);

  return (
    <>
      {showPage && (
        <>
          <div className="flex md:h-screen w-full overflow-auto">
            <Sidebar />
            <div className="w-full mx-auto max-w-8xl p-4 min-h-screen md:h-full">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
}
