import s from "./index.module.css";
import { IconUser, IconUsers } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

export const SidebarDrop = ({ drop, setIsDropOpen, sidebarCollapsed }) => {

  const location = useLocation();

  //obtener la clase de los links
  const getLinkClass = (path) => {
    return location.pathname === path ? `${s.link} ${s.active}`: s.link;
  };

  return (
    <>
      {drop ? (
        <div className={sidebarCollapsed?`${s.dropDown} ${s.close}`:`${s.dropDown}`}>
          <div className="relative ps-3 flex">
            <Link
              to="/kanbanPersonal"
              className={getLinkClass("/kanbanPersonal")}
              onClick={()=>setIsDropOpen(false)}
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
              className={getLinkClass("/kanbanTeam")}
              onClick={()=>setIsDropOpen(false)}
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
