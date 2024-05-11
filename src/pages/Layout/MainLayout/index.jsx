import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../../../components/shared";
import { getCurrentUser } from "../../../services/auth";

export function MainLayout() {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);

  const fetchUser = async () => {
    try {
      await getCurrentUser();
      setShowPage(true);
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {showPage && (
        <>
          <div className="flex md:h-screen w-full">
            <Sidebar />
            <div className='w-full'>
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
}
