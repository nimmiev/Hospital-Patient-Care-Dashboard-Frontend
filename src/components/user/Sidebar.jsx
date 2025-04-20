import React from "react";
import { Link } from "react-router-dom";
import { Home, User, Droplet, Calendar, Settings, ListTodo, Moon, Sun } from "lucide-react";
import { useUserData } from "../../hooks/useUserData";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
  const { userData, loading } = useUserData();
  const { theme, toggleTheme } = useTheme();

  if (loading)
    return <div className="text-center py-10">Loading...</div>;
  if (!userData || !userData.role)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load user data
      </div>
    );

  const role = userData.role.toLowerCase();

  return (
    <div
      className={`w-64 h-full flex flex-col justify-between p-4 transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-900 border-r border-gray-200"
      }`}
    >
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        {/* User Info */}
        <div className="flex flex-col items-center text-center gap-2">
          <img
            src={userData.profilepic}
            alt="User Profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg";
            }}
          />
          <div>
            <h2 className="text-lg font-semibold">{userData.name}</h2>
            <p className="text-sm text-gray-400">{userData.email}</p>
            <span className="text-xs bg-blue-700 px-2 py-0.5 rounded-full mt-1 inline-block">
              {userData.role}
            </span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-4 mt-6">
          <Link to={`/${role}/profile`}>
            <SidebarLink icon={<User size={20} />} label="Profile" />
          </Link>

          <Link to={`/${role}/appoinments`}>
            <SidebarLink icon={<Calendar size={20} />} label="Appointments" />
          </Link>

          {role !== "doctor" && (
            <Link to={`/${role}/bloodbanks`}>
              <SidebarLink icon={<Droplet size={20} />} label="Bloodbanks" />
            </Link>
          )}

          {(role === "doctor" || role === "staff") && (
            <Link to={`/${role}/patients`}>
              <SidebarLink icon={<User size={20} />} label="Patients" />
            </Link>
          )}

          {(role !== "doctor" && role !== "patient") && (
            <Link to={`/${role}/tasks`}>
              <SidebarLink icon={<ListTodo size={20} />} label="Tasks" />
            </Link>
          )}

          <Link to={`/${role}/settings`}>
            <SidebarLink icon={<Settings size={20} />} label="Settings" />
          </Link>
        </nav>
      </div>

      {/* Bottom Section: Theme Toggle */}
      <div className="flex justify-center mt-6">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full hover:bg-blue-500 hover:text-white transition"
          title="Toggle Theme"
        >
          {theme === "light" ? <Moon size={32} /> : <Sun size={22} />}
        </button>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, label }) => (
  <div className="flex items-center gap-3 cursor-pointer hover:text-blue-500 transition">
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;
