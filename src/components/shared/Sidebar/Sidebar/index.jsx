import { useEffect, useState } from "react";
import { SidebarLogo } from "../SidebarLogo";
import {
  IconLayout2,
  IconLogout,
  IconPuzzle,
  IconSalad,
  IconSettings,
  IconTable,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { CustomLink } from "../CustomLink";

const linksArray = [
  {
    collapsed: false,
    icon: <IconLayout2 />,
    name: "Home",
    route: "/",
  },
  {
    collapsed: false,
    icon: <IconPuzzle />,
    name: "Habits",
    route: "/habits",
  },
  {
    collapsed: false,
    icon: <IconTable />,
    name: "Board",
    route: "/kanbanPersonal",
  },
  {
    collapsed: false,
    icon: <IconSalad />,
    name: "Nutrition",
    route: "/nutrition",
  },
  // {
  //   collapsed:false,
  //   icon: <IconPigMoney />,
  //   name: "Finances",
  //   route: "/finances",
  // }
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = () => setCollapsed(!collapsed);

  const userLogout = () => {
    localStorage.removeItem("acessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div
      className={`p-6  w-full transition-all delay-40 ${
        collapsed ? "max-w-36" : "max-w-72"
      }`}>
      <div className="w-full bg-primary flex rounded-3xl flex-col justify-between h-full py-12">
        <div className="flex w-full flex-col ">
          <SidebarLogo
            handleCollapsed={handleCollapsed}
            collapsed={collapsed}
          />
          <nav className="w-full pl-6 mt-4">
            <ul className="w-full py-4 flex gap-2 flex-col ">
              {linksArray.map((item, idx) => (
                <CustomLink
                  key={idx}
                  collapsed={collapsed}
                  icon={item.icon}
                  name={item.name}
                  route={item.route}
                />
              ))}
            </ul>
          </nav>
        </div>
        <div className="">
          <ul className="pl-6 w-full flex flex-col ">
            <CustomLink
              collapsed={collapsed}
              icon={<IconSettings />}
              name="Settings"
              route="/settings"
            />
          </ul>
          <ul className="px-6 py-3">
            <button
              onClick={userLogout}
              className="text-white w-full p-4 flex items-center gap-2 transition-all hover:bg-red-500 rounded-lg">
              <span>
                <IconLogout />
              </span>
              {!collapsed && (
                <span className="font-primary font-semibold">Logout</span>
              )}
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};
