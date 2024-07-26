/* eslint-disable react/prop-types */
import { useState } from "react";
import { SidebarDrop } from "../SidebarDrop";
import logo from "../../../../assets/logo.svg";
import s from "./index.module.css";
import {
  IconLayout2,
  IconLogout,
  IconPuzzle,
  IconSalad,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { logoutUser } from "../../../../services/auth";

export const SidebarMobile = () => {
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
      // await logoutUser();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

  return (
    <>
      <aside
        className={`z-100 fixed bottom-0 p-3 w-full overflow-auto`}>
        <div
          className={`w-full bg-primary h-[70px] flex justify-center rounded-[35px] overflow-auto gap-5 p-3`}>
          <div className="flex gap-5">
            <div className="w-full max-w-12 items-center justify-center flex">
              <img
                className="w-full object-cover"
                src={logo}
                alt="Logo Life Unity"
              />
            </div>
            <nav className={`w-full ${s.options}`}>
              <ul className="flex items-center gap-2">
                <li>
                  <Link
                    to="/"
                    className={getLinkClass("/")}
                    onClick={() => setIsDropOpen(false)}>
                    <IconLayout2 className="flex-none" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/habits"
                    className={getLinkClass("/habits")}
                    onClick={() => setIsDropOpen(false)}>
                    <IconPuzzle className="flex-none" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kanbanPersonal"
                    className={getLinkClass("/kanbanPersonal")}
                    onClick={() => setIsDropOpen(false)}>
                    <IconUser className="flex-none" />
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
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={`${s.options}  flex-none`}>
            <ul className="flex items-center gap-2">
              <li>
                <Link
                  to="/settings"
                  className={getLinkClass("/settings")}
                  onClick={() => setIsDropOpen(false)}>
                  <IconSettings className="flex-none" />
                </Link>
              </li>
              <li>
                <a
                  id="logout"
                  className={`text-white cursor-pointer ${s.logout}`}
                  onClick={() => {
                    setIsDropOpen(false);
                    userLogout();
                  }}>
                  <IconLogout className="flex-none" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};
