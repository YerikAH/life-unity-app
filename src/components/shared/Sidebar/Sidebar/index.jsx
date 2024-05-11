import { useState } from "react";
import { SidebarLogo } from "../SidebarLogo";
import {
  IconLayout2,
  IconPuzzle,
  IconSalad,
  IconSettings,
  IconTable,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../services/auth";
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
    route: "/board",
  },
  {
    collapsed: false,
    icon: <IconSalad />,
    name: "Nutrition",
    route: "/nutrition",
  },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false)

  const handleCollapsed = () => setCollapsed(!collapsed)

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
    <div className={`p-6  w-full transition-all delay-100 ${collapsed ? "max-w-36" : "max-w-80"}`}>
      <div className="w-full bg-primary flex rounded-lg flex-col justify-between h-full py-12">
        <div className="flex w-full flex-col ">
          <SidebarLogo handleCollapsed={handleCollapsed} collapsed={collapsed} />
          <nav className='w-full pl-6 mt-8'>
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
        <div className="pl-6">
          <ul className="w-full flex flex-col ">
            <CustomLink
              collapsed={collapsed}
              icon={<IconSettings />}
              name="Settings"
              route="/settings"
            />
          </ul>
        </div>
      </div>
    </div >
  );
};
