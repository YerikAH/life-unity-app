import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar, SidebarMobile } from "../../../components/shared";
import { isTokenExpired, refreshAccessToken } from "../../../utils";

export function MainLayout() {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

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

  // useEffect(() => {
  //   const validateTokens = async () => {
  //     const accessToken = localStorage.getItem("accessToken");
  //     const refreshToken = localStorage.getItem("refreshToken");
  //
  //     // Verifica si los tokens existen
  //     if (!accessToken || !refreshToken) {
  //       navigate("/login");
  //       return;
  //     }
  //
  //     // Verifica si el token de acceso ha caducado
  //     if (isTokenExpired(accessToken)) {
  //       // Si el token de acceso ha caducado, intenta obtener un nuevo token de acceso usando el token de refresco
  //       const success = await refreshAccessToken();
  //
  //       if (success) {
  //         setShowPage(true);
  //       } else {
  //         // Si no se puede obtener un nuevo token de acceso, redirige a la página de login
  //         localStorage.removeItem("accessToken");
  //         localStorage.removeItem("refreshToken");
  //         navigate("/login");
  //       }
  //     } else {
  //       // Si el token de acceso no ha caducado, muestra la página
  //       setShowPage(true);
  //     }
  //   };
  //
  //   validateTokens();
  // }, [navigate]);

  return (
    <>
      {showPage && (
        <>
          <div className="flex md:h-screen w-full overflow-auto">
            {/*  {width < 768 ? (<SidebarMobile />) : (<Sidebar />)*/}
            {/*}*/}
            <div className="w-full mx-auto max-w-8xl p-4 min-h-screen md:h-full">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
}
