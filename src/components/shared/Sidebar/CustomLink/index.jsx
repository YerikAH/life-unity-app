import { Link } from "react-router-dom";
import s from "./index.module.css";

export const CustomLink = ({ icon, name, route, collapsed }) => {

  const getLinkClass = (path, dropdownPaths = []) =>
    location.pathname === path || dropdownPaths.includes(location.pathname)
      ? `${s.active} ${s.items}`
      : s.items;

  return (
    <li>
      <Link
        to={route}
        className={`p-4 flex items-center gap-2 rounded-s-lg ${getLinkClass(
          route
        )}`}
      >
        <span>{icon}</span>
        {!collapsed && (
          <span className="font-primary font-semibold"> {name} </span>
        )}
      </Link>
    </li>
  );
};
