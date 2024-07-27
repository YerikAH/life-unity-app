import logo from "../../../../assets/logo.svg";
import s from "./index.module.css";
import {
  IconLayout2,
  IconLogout,
  // IconPuzzle,
  IconSalad,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const SidebarMobile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getLinkClass = (path, dropdownPaths = []) => {
    if (
      location.pathname === path ||
      dropdownPaths.includes(location.pathname)
    ) {
      return `${s.active} ${s.items}`;
    }
    return s.items;
  };

  const userLogout = () => {
    localStorage.removeItem("acessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <>
      <aside className={`z-100 fixed bottom-0 p-3 w-full overflow-auto z-40`}>
        <div
          className={`w-full bg-primary h-[70px] flex justify-center rounded-[35px] overflow-auto gap-5 p-3`}>
          <div className="flex gap-5">
            <div className="w-full max-w-12 items-center justify-center flex flex-none">
              <img
                className="w-full object-cover"
                src={logo}
                alt="Logo Life Unity"
              />
            </div>
            <div className="flex gap-1">
              <nav
                className={`w-full md:w-full flex justify-center md:items-center gap-5 overflow-hidden md:ps-10`}>
                <ul className="flex items-center gap-1 text-white">
                  <Link to="/" className={getLinkClass("/")}>
                    <IconLayout2 className="flex-none" />
                  </Link>
                  {/*<li>*/}
                  {/*    <Link*/}
                  {/*        to="/habits"*/}
                  {/*        className={getLinkClass("/habits")}*/}
                  {/*        onClick={() => setIsDropOpen(false)}>*/}
                  {/*        <IconPuzzle className="flex-none"/>*/}
                  {/*    </Link>*/}
                  {/*</li>*/}
                  <Link
                    to="/kanbanPersonal"
                    className={getLinkClass("/kanbanPersonal")}>
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
                  <Link to="/nutrition" className={getLinkClass("/nutrition")}>
                    <IconSalad className="flex-none" />
                  </Link>
                </ul>
              </nav>
              <div
                className={`flex justify-center gap-5 overflow-hidden flex-none`}>
                <ul className="flex items-center gap-1">
                  <Link to="/settings" className={getLinkClass("/settings")}>
                    <IconSettings className="flex-none" />
                  </Link>
                  <a
                    id="logout"
                    className={`text-white cursor-pointer hover:bg-red-500 p-2 rounded-lg`}
                    onClick={() => {
                      userLogout();
                    }}>
                    <IconLogout className="flex-none" />
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
