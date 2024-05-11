/* eslint-disable react/prop-types */
import { useState } from "react";
import { SidebarLogo } from "../SidebarLogo";
import s from "./index.module.css";
import {
  IconLayout2,
  IconLogout,
  IconPuzzle,
  IconSalad,
  IconSettings,
  IconUser
} from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../services/auth";

export const Sidebar = ({
  sidebarCollapsed,
  widthSidebarOpen,
  handleSidebar,
}) => {

  const location = useLocation();
  const navigate = useNavigate();
  const [isDropOpen, setIsDropOpen] = useState(false);

  const handleSetDrop = () => {
    setIsDropOpen(!isDropOpen);
  };


  const getLinkClass = (path, dropdownPaths = []) => {
    if (
      location.pathname === path ||
      dropdownPaths.includes(location.pathname)
    ) {
      return `${s.active} ${s.items}`;
    }
    return s.items;
  };

  const userLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

  return (
    <>
      <aside
        className="z-10 bottom-0 p-3 w-full md:p-6 md:h-full md:w-auto fixed md:static overflow-auto">
        <div
          className={`w-full bg-primary h-[70px] flex justify-center rounded-[35px] md:flex-col md:justify-between md:py-16 md:h-full overflow-auto ${widthSidebarOpen}`}>
          <div className="flex gap-5 md:w-full md:flex-col md:gap-10">
            <SidebarLogo
              open={sidebarCollapsed}
              handleSidebar={handleSidebar}
            />
            <nav
              className={`w-full ${s.options} ${sidebarCollapsed && "md:ps-5"
                }`}>
              <ul>
                <li>
                  <Link
                    to="/"
                    className={getLinkClass("/")}
                    onClick={() => setIsDropOpen(false)}>
                    <IconLayout2 className="flex-none" />
                    <span className={`${sidebarCollapsed && "hidden"} font-primary`}>
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/habits"
                    className={getLinkClass("/habits")}
                    onClick={() => setIsDropOpen(false)}>
                    <IconPuzzle className="flex-none" />
                    <span className={`${sidebarCollapsed && "hidden"} font-primary`}>
                      Habits
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kanbanPersonal"
                    className={getLinkClass("/kanbanPersonal")}
                    onClick={() => setIsDropOpen(false)}>
                    <IconUser className="flex-none" />
                    <span className={`${sidebarCollapsed && "hidden"} font-primary`}>
                      Kanban Board
                    </span>
                  </Link>
                  {/* Cuando haya Team Work se implentara */}
                  {/* <a
                    className={`cursor-pointer ${getLinkClass("", [
                      "/kanbanTeam",
                      "/kanbanPersonal",
                    ])}`}
                    onClick={handleSetDrop}>
                    <div className="flex items-center gap-5 pointer-events-none">
                      <IconListCheck className="flex-none" />
                      <span className={`${sidebarCollapsed && "hidden"}`}>
                        Kanban
                      </span>
                    </div>
                    <div
                      className={`hidden items-center pointer-events-none ${
                        sidebarCollapsed ? "md:hidden" : "md:flex"
                      }`}>
                      <IconChevronDown />
                    </div>
                  </a>
                  <SidebarDrop
                    drop={isDropOpen}
                    setIsDropOpen={setIsDropOpen}
                    sidebarCollapsed={sidebarCollapsed}
                  /> */}
                </li>
                <li>
                  <Link
                    to="/nutrition"
                    className={getLinkClass("/nutrition")}
                    onClick={() => setIsDropOpen(false)}>
                    <IconSalad className="flex-none" />
                    <span className={`${sidebarCollapsed && "hidden"} font-primary`}>
                      Nutrition
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div
            className={`${s.options} ${sidebarCollapsed ? "md:ps-5" : ""
              } flex-none`}>
            <ul>
              <li>
                <Link
                  to="/settings"
                  className={getLinkClass("/settings")}
                  onClick={() => setIsDropOpen(false)}>
                  <IconSettings className="flex-none" />
                  <span className={`${sidebarCollapsed && "hidden"} font-primary`}>
                    Settings
                  </span>
                </Link>
              </li>
              <li>
                <a
                  id="logout"
                  className={`text-white cursor-pointer ${s.logout} font-primary`}
                  onClick={() => {
                    setIsDropOpen(false);
                    userLogout();
                  }}>
                  <IconLogout className="flex-none" />
                  <span className={`${sidebarCollapsed && "hidden"}`}>
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};
