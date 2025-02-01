import React, { useState, createElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_LOGO, SIDEBAR_TITLE, SIDEBAR_LINKS } from "../constants/SidebarData";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6"; 
import Tooltip from "./Tooltip";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current route path

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden fixed top-5 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg" 
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes className="hidden text-xl" /> : <FaBars className="text-xl" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed md:relative h-dvh bg-gray-900 w-max p-4 text-white flex flex-col gap-8 border-r border-gray-400/20 md:border-none transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out`}>

        {/* Sidebar Close Button */}
        <button
          className="md:hidden absolute top-9 right-0 bg-gray-900 p-1 rounded-full text-white text-base"
          onClick={toggleSidebar}
        >
          <FaTimes />
        </button>

        {/* Logo / Title */}
        <Link to="/" className="flex items-center justify-center gap-2 p-4 bg-gray-800 rounded-lg">
          <img src={SIDEBAR_LOGO} alt={SIDEBAR_TITLE} className="w-8 h-8" />
          <h1 className="md:hidden text-2xl font-bold">{SIDEBAR_TITLE}</h1>
        </Link>

        <div className="flex flex-col items-start gap-6 flex-1 bg-gray-800 rounded-lg p-4">
          {/* Navigation Links */}
          <nav className="flex flex-col items-start gap-6 flex-1 bg-gray-800 rounded-lg">
            {SIDEBAR_LINKS.map(({ name, link, icon }, index) => {
              const isActive = location.pathname === link; // Check if the current path matches the link

              return (
                <Tooltip content={name} position="right" key={index}>
                  <Link
                    to={link}
                    onClick={toggleSidebar}
                    className={`w-full flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-200 cursor-pointer 
                      ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-blue-400"}`}
                  >
                    <span className="text-2xl">{createElement(icon)}</span>
                    <p className="md:hidden text-white">{name}</p>
                  </Link>
                </Tooltip>
              );
            })}
          </nav>

          {/* Profile Section */}
          <div className={`w-full flex items-center gap-2 py-2 rounded-lg transition-all duration-200 cursor-pointer ${location.pathname === "/profile" ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-blue-400"}`}
          >
            <Tooltip content="Profile" position="right">
              <Link 
                to="/profile"
                onClick={toggleSidebar}
                className="w-full flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-200 cursor-pointer"
              >
                <span className="text-2xl"><FaRegCircleUser /></span>
                <p className="md:hidden text-white">Profile</p>
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
