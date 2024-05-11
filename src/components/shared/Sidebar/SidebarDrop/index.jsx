import s from "./index.module.css";
import { IconUser, IconUsers } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

export const SidebarDrop = ({ drop, setIsDropOpen, sidebarCollapsed }) => {
  const location = useLocation();


  const getLinkClass = (path) => {
    return location.pathname === path ? `${s.link} ${s.active}` : s.link;
  };

  return (
    <>
      {drop ? (
        <div className={sidebarCollapsed ? `${s.close}` : `${s.dropDown}`}>
          <div className="relative ps-3 flex">
            <Link
              to="/kanbanPersonal"
              className={`${getLinkClass("/kanbanPersonal")} font-primary`}
              onClick={() => setIsDropOpen(false)}
            >
              <div>
                <IconUser />
              </div>
              Personal
            </Link>
          </div>
          <div className="relative ps-3 flex">
            <Link
              to="/kanbanTeam"
              className={`${getLinkClass("/kanbanTeam")} font-primary`}
              onClick={() => setIsDropOpen(false)}
            >
              <div>
                <IconUsers />
              </div>
              Team Work
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
