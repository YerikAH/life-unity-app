import { useState } from 'react';
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/shared";
import { set } from 'react-hook-form';

export function Layout() {

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [widthSidebarOpen, setWidthSidebarOpen] = useState('w-52');
  const [contentWidth, setContentWidth] = useState('md:w-[calc(100%-300px)]');

  const handleSidebar = () => {
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
      setWidthSidebarOpen('md:w-52');
      setContentWidth('md:w-[calc(100%-300px)]');
    } else {
      setSidebarCollapsed(true);
      setWidthSidebarOpen('md:w-20');
      setContentWidth('md:w-[calc(100%-150px)]');
    }
  }



  return (
    <div className="flex md:h-screen w-full">
      <Sidebar sidebarCollapsed={sidebarCollapsed}
      widthSidebarOpen={widthSidebarOpen} 
      handleSidebar={handleSidebar}/>
      
      <div className={`w-full mx-5 md:ms-auto overflow-y-auto py-6 md:pe-10 overflow-x-visible ${contentWidth}`}>
        <Outlet />
      </div>
    </div>
  )
}