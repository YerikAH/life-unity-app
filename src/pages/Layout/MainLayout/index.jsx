import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../../../components/shared";
import { getCurrentUser } from "../../../services/auth";

export function MainLayout() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [widthSidebarOpen, setWidthSidebarOpen] = useState("w-52");
  const [contentWidth, setContentWidth] = useState("md:w-[calc(100%-300px)]");
  const [showPage, setShowPage] = useState(false);

  const handleSidebar = () => {
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
      setWidthSidebarOpen("md:w-52");
      setContentWidth("md:w-[calc(100%-300px)]");
    } else {
      setSidebarCollapsed(true);
      setWidthSidebarOpen("md:w-20");
      setContentWidth("md:w-[calc(100%-150px)]");
    }
  };

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
            <Sidebar
              sidebarCollapsed={sidebarCollapsed}
              widthSidebarOpen={widthSidebarOpen}
              handleSidebar={handleSidebar}
            />

            <div
              className={`w-full mx-5 md:ms-auto overflow-y-auto md:pe-10 overflow-x-visible mb-32 md:mb-0 ${contentWidth}`}>
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
}
