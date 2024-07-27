import { useState, useEffect, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar, SidebarMobile } from "../../../components/shared";
import {
  isTokenExpired,
  obtenerInfoToken,
  refreshAccessToken,
} from "../../../utils";
import { useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function MainLayout() {
  const navigate = useNavigate();
  const boards = useSelector((state) => state.kanban.boards).filter(
    (board) => board.id_user === obtenerInfoToken().user_id
  );
  const tasks = useSelector((state) => state.kanban.tasks);
  const [showPage, setShowPage] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [showToastWarning, setShowToastWarning] = useState(false);
  const [showToastDanger, setShowToastDanger] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = () => setCollapsed(!collapsed);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const taskNotification = useCallback(() => {
    setShowToastWarning(false);
    setShowToastDanger(false);
    const tasksFiltered = [];
    boards.forEach((board) => {
      tasks.forEach((task) => {
        if (task.id_board === board.id) {
          tasksFiltered.push(task);
        }
      });
    });

    const now = new Date();
    tasksFiltered.forEach((task) => {
      if (task?.status === "Done") return;
      if (!task?.vencimiento) return;
      const taskDueDate = new Date(task?.vencimiento);
      const timeDifference = taskDueDate - now;
      if (timeDifference <= 0) {
        toast.error("Hay una tarea que vencio", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setShowToastDanger(true);
      } else if (timeDifference <= 30 * 60 * 1000) {
        toast.warn("Revisa tus tareas, una se va a vencer!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setShowToastWarning(true);
      }
    });
  }, [boards, tasks]);

  useEffect(() => {
    taskNotification();
    const intervalId = setInterval(() => {
      taskNotification();
    }, 60000);
    return () => clearInterval(intervalId);
  }, [taskNotification]);

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
      if (!refreshAccessToken()) {
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
    }
    // si el token de acceso no ha expirado ni el refresh token, muestra la página
    setShowPage(true);
  }, [navigate]);

  const getMaxWidthClass = (collapsed, width) => {
    if (!collapsed) {
      if (width > 1024) return "max-w-8xl";
      if (width > 880) return "max-w-3xl";
      if (width > 810) return "max-w-xl";
      if (width > 768) return "max-w-lg";
    }
    return "max-w-8xl mx-auto";
  };

  return (
    <>
      {showPage && (
        <>
          <div className="flex md:h-screen w-full overflow-hidden">
            {width < 768 ? (
              <SidebarMobile />
            ) : (
              <Sidebar
                collapsed={collapsed}
                handleCollapsed={handleCollapsed}
              />
            )}
            <div
              className={`w-full ${getMaxWidthClass(
                collapsed,
                width
              )} p-4 min-h-screen md:h-full overflow-auto`}>
              <Outlet />
              {showToastWarning || showToastDanger ? (
                <div className="fixed bottom-0 right-0 z-50 p-4 m-4 bg-white shadow-lg rounded-xl">
                  <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition:Bounce
                  />
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
}
