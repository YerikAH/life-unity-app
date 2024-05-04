import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../services/auth";

//esto solo funciona para el layout de auth o sea el path login y signup
export function AuthLayout() {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);

  const fetchUser = async () => {
    try {
      const user = await getCurrentUser();

      if (user) {
        navigate("/");
      }else{
        setShowPage(true);
      }
    } catch (error) {
      setShowPage(true);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <div className="h-full">{showPage && <Outlet />}</div>;
}
