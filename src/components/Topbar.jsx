import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Notification from "./Notification";
import { FaSearch } from "react-icons/fa";
import { SiFusionauth } from "react-icons/si";
import { TbLogout } from "react-icons/tb";
import { TiWarning } from "react-icons/ti";
import Tooltip from "./Tooltip";

function Topbar() {
  const { isLoggedIn, login, logout } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({});

  const handleLogin = () => {
    login(); 
    setShowNotification(true);
    setNotificationData({
      icon: TiWarning,
      description: "Successfully logged in",
      role: "success",
      mode: () => setShowNotification(false),
    });
  };

  const handleLogout = () => {
    logout(); 
    setShowNotification(true);
    setNotificationData({
      icon: TiWarning,
      description: "Successfully logged out",
      role: "warning",
      mode: () => setShowNotification(false),
    });
  };

  return (
    <>
      <div className="w-full bg-gray-900 text-white flex items-center justify-between p-6 md:p-4">
        {/* App Title */}
        <h1 className="text-xl font-bold ml-8 md:ml-0">SCAM ERA</h1>

        {/* Search Bar - Responsive */}
        <div className="hidden md:flex items-center gap-2 bg-gray-800 px-2 py-1 rounded-full w-full max-w-xs sm:max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-white placeholder-gray-400 p-2 rounded-lg focus:outline-none"
            aria-label="Search"
          />
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </div>

        {/* Authentication Button */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Tooltip content="Logout">
              <button
                className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-600 transition-all duration-300"
                onClick={handleLogout}
              >
                <TbLogout />
              </button>
            </Tooltip>
          ) : (
            <Tooltip content="Login">
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
                onClick={handleLogin}
              >
                <SiFusionauth />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Logout Notification with Close Button */}
      {showNotification && <Notification data={notificationData} />}
    </>
  );
}

export default Topbar;
