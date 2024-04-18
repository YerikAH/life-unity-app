import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/shared";

export function Layout() {
  return (
    <div className="flex md:h-screen w-full">
      <Sidebar />
      
      <div className="w-full md:max-w-7xl md:ms-auto md:me-20 overflow-y-auto py-6 mx-5 md:pe-10">
        <Outlet />
      </div>
    </div>
  )
}