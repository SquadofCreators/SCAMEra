import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Import Auth Context
import { Navigate } from "react-router-dom";
import { Switch } from "@headlessui/react";
import { FaMoon, FaSun, FaLock } from "react-icons/fa";

function Settings() {
  const { isLoggedIn, logout } = useAuth(); // Get authentication state
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [language, setLanguage] = useState("English");
  const [fontSize, setFontSize] = useState("medium");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Load preferences from localStorage
  useEffect(() => {
    setDarkMode(localStorage.getItem("darkMode") === "true");
    setLanguage(localStorage.getItem("language") || "English");
    setFontSize(localStorage.getItem("fontSize") || "medium");
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  // Handle font size change
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
    localStorage.setItem("fontSize", e.target.value);
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    localStorage.setItem("language", e.target.value);
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    console.log("Account deleted.");
    setShowDeleteConfirm(false);
    logout();
  };

  // Redirect if not logged in
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white flex flex-col gap-5">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Dark Mode Toggle */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg">Dark Mode</span>
        <Switch
          checked={darkMode}
          disabled
          onChange={toggleDarkMode}
          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
            darkMode ? "bg-blue-600" : "bg-gray-600"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              darkMode ? "translate-x-6" : "translate-x-1"
            }`}
          />
          {darkMode ? <FaMoon className="absolute right-1/7 text-black text-xs" /> : <FaSun className="absolute left-1/7 text-yellow-600 text-xs" />}
        </Switch>
      </div>

      {/* Email Notifications Toggle */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg">Email Notifications</span>
        <Switch
          checked={notifications}
          onChange={setNotifications}
          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
            notifications ? "bg-green-600" : "bg-gray-600"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              notifications ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </Switch>
      </div>

      {/* Two-Factor Authentication */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg flex items-center gap-2">
          Two-Factor Authentication <FaLock />
        </span>
        <Switch
          checked={twoFactor}
          onChange={setTwoFactor}
          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
            twoFactor ? "bg-purple-600" : "bg-gray-600"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              twoFactor ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </Switch>
      </div>

      {/* Language Selection */}
      <div className="mb-4">
        <label className="block text-lg mb-1">Language</label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          <option>English</option>
          <option>Tamil</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>

      {/* Font Size Selection */}
      <div className="mb-4">
        <label className="block text-lg mb-1">Font Size</label>
        <select
          value={fontSize}
          onChange={handleFontSizeChange}
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* Change Password Button */}
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition">
        Change Password
      </button>

      {/* Delete Account Button */}
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition mt-4"
      >
        Delete Account
      </button>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg text-center shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Account Deletion</h2>
            <p className="text-gray-400 mb-4">This action cannot be undone!</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
