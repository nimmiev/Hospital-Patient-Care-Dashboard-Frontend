import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const Header = ({ setIsOpen }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await axiosInstance.put("/api/admin/logout"); // Call logout API

      // Clear localStorage/sessionStorage values
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.setItem("theme", "light"); // Reset theme to default

      navigate("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="navbar bg-base-300 w-full flex items-center justify-between px-6 shadow-lg">
      {/* Sidebar Toggle Button */}
      <button onClick={() => setIsOpen(prev => !prev)} className="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-6 w-6 stroke-current"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="text-xl font-bold tracking-wide">Admin Dashboard</div>

      {/* Theme Toggle Button */}
      <button onClick={toggleTheme} className="btn btn-sm btn-outline">
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      {/* Profile Dropdown */}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost flex items-center gap-2">
          <FaUserCircle className="text-2xl" />
          <span className="hidden sm:inline">Profile</span>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content bg-base-200 rounded-box z-10 mt-4 w-52 p-2 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <li>
            <Link to="account" className="hover:bg-base-300 transition duration-200 rounded-md">My Account</Link>
          </li>
          {/* <li>
            <Link to="settings" className="hover:bg-base-300 transition duration-200 rounded-md">Settings</Link>
          </li> */}
          <li>
            <button className="hover:bg-red-500 text-red-600 hover:text-white transition duration-200 rounded-md" onClick={ handleLogout }>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
