import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useUserData } from "../../hooks/useUserData";
import { axiosInstance } from "../../config/axiosInstance";

const DashbordHeader = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { userData, loading } = useUserData();

  const handleLogout = async () => {
    try {
      const role = localStorage.getItem("role")?.toLowerCase();
      const apiUrl = role ? `/api/${role}/logout` : "/api/logout";

      await axiosInstance.put(apiUrl);

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.setItem("theme", "light");

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  if (loading) {
    return (
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-white">Loading...</span>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <button className="text-2xl font-bold text-white" onClick={() => navigate("/")}>
          HEALTHCARE
        </button>

        <nav className="hidden lg:flex space-x-6 text-white">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          <Link to="/about" className="hover:text-gray-300 transition">About</Link>
          <Link to="/contact" className="hover:text-gray-300 transition">Contact Us</Link>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <Link to={`/${userData?.role?.toLowerCase()}`}>
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={userData?.profilepic || "/default-profile.jpg"} alt="Profile" />
              </div>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>

        <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-4 py-4 text-center">
            <Link to="/dashboard" className="py-2 text-gray-700 hover:bg-gray-200 transition" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/appointments" className="py-2 text-gray-700 hover:bg-gray-200 transition" onClick={() => setMenuOpen(false)}>Appointments</Link>
            <Link to="/profile" className="py-2 text-gray-700 hover:bg-gray-200 transition" onClick={() => setMenuOpen(false)}>Profile</Link>
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="py-2 text-red-600 hover:bg-gray-200 transition">
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default DashbordHeader;
