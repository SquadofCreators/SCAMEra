import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="sticky h-screen">
        <Sidebar />
      </div>

      <div className="flex flex-col w-full px-6">
        <Topbar />
        <div className="mainContainer h-full py-6 mt-1 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
