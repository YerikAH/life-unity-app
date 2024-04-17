import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/shared";

export function Layout() {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="w-full max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  )
}