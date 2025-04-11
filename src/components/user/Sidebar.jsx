import { Home, User, Droplet, Calendar, Settings } from "lucide-react";
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../config/axiosInstance";

const Sidebar = () => {

   const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (!token) {
        navigate("/login");
        return;
      }
  
      const fetchUser = async () => {
        try {
          const res = await axiosInstance.get(`/api/${role}/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUserData(res.data.data);
        } catch (err) {
          console.error("User fetch failed", err);
          navigate("/login");
        }
      };
  
      fetchUser();
    }, [navigate]);
  
    if (!userData) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="w-64 h-full bg-gray-900 text-white p-4 flex flex-col gap-6">
      {/* User Header Section */}
      <div className="flex flex-col items-center text-center gap-2">
      <img src={userData.profilepic} alt="User Profile"  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1744052250~exp=1744055850~hmac=6a95f609a1295cae38554edc4b2584e26be84ee4c5804dee1769ff476ee02c9c&w=740";
        }} />
        <div>
          <h2 className="text-lg font-semibold">{userData.name}</h2>
          <p className="text-sm text-gray-400">{userData.email}</p>
          <span className="text-xs bg-blue-700 px-2 py-0.5 rounded-full mt-1 inline-block">
          {userData.role}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 mt-6">
        {/* <SidebarLink icon={<Home size={20} />} label="Home" /> */}
        <Link to={`/${userData.role.toLowerCase()}/profile`}>
          <SidebarLink icon={<User size={20} />} label="Profile" />
        </Link>
        {/* display only for patient */}
        <Link to={`/${userData.role.toLowerCase()}/appoinments`}>
          <SidebarLink icon={<Calendar size={20} />} label="Appointments" />
        </Link>
        {userData.role.toLowerCase() !== "doctor" && (
          <Link to={`/${userData.role.toLowerCase()}/bloodbanks`}>
            <SidebarLink icon={<Droplet size={20} />} label="Bloodbanks" />
          </Link>
        )}
        <Link to={`/${userData.role.toLowerCase()}/settings`}>
          <SidebarLink icon={<Settings size={20} />} label="Settings" />
        </Link>
      </nav>
    </div>
  );
};

const SidebarLink = ({ icon, label }) => (
  <div className="flex items-center gap-3 cursor-pointer hover:text-blue-400 transition">
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;
