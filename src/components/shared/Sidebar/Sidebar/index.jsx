import { useState } from "react";
import { SidebarDrop } from "../SidebarDrop";
import { SidebarLogo } from "../SidebarLogo";
import s from "./index.module.css";
import { IconLayout2, IconLogout, IconPuzzle, IconSalad, IconSettings } from "@tabler/icons-react";

export const Sidebar = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  return (
    <>
      <aside
        className={`z-10  p-3 md:p-6 h-full md:w-[250px] ${sidebarCollapsed ? "" : s.close
          }`}>
        <div
          className={`bg-[#000428] h-[70px] flex justify-center rounded-[35px] md:flex-col md:justify-between md:py-16 md:h-full ${s.sidebar}`}>
          <div className="flex gap-5 md:w-full md:flex-col md:gap-10">
            <SidebarLogo
              open={false}
            />
            <nav className={`w-full ${s.options}`}>
              <ul>
                <li>
                  <a
                    id="home"
                    href="#"
                    className={s.items}
                  >
                    <IconLayout2 className="text-white pointer-events-none" />
                    <span className="pointer-events-none">Home</span>
                  </a>
                </li>
                <li>
                  <a
                    id="habbits"
                    href="#"
                    className={s.items}
                  >
                    <IconPuzzle />
                    <span>Habits</span>
                  </a>
                </li>
                <li>
                  <a
                    id="kanban"
                    href="#"
                    className={s.items}
                  >
                    <div className="flex items-center gap-5 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-list">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 6l11 0" />
                        <path d="M9 12l11 0" />
                        <path d="M9 18l11 0" />
                        <path d="M5 6l0 .01" />
                        <path d="M5 12l0 .01" />
                        <path d="M5 18l0 .01" />
                      </svg>
                      <span>Kanban</span>
                    </div>
                    <div className="hidden md:flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 20 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 9l6 6l6 -6" />
                      </svg>
                    </div>
                  </a>
                  <SidebarDrop
                    activeLink={false}
                  />
                </li>
                <li>
                  <a
                    id="nutrition"
                    href="#"
                    className={s.items}
                  >
                    <IconSalad />
                    <span >Nutrition</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className={`${s.options} flex-none`}>
            <ul>
              <li>
                <a
                  id="settings"
                  href="#"
                  className="items"
                >
                  <IconSettings className="text-white" />
                  <span className="text-white">Settings</span>
                </a>
              </li>
              <li>
                {/* utilizar Link to para indicar la redireccion y el el side bar seria el loyout que siempre permanecera */}
                <a
                  id="logout"
                  href="#"
                  className={`text-white ${s.logout}`}
                >
                  <IconLogout />
                  <span >Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
