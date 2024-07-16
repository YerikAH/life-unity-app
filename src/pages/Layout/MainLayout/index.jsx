import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../../../components/shared";
import { validarToken } from "../../../utils";

export function MainLayout() {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);

  const fetchUser = () => {
      const isAuth = validarToken();
      if (isAuth) {
        setShowPage(true);
      } else {
        navigate("/login");
      }
  };

  useEffect(() => {
    fetchUser();
  });

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
