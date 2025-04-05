import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Sidebar, X, LogOut, User } from "lucide-react"; // Icons

const DashbordHeader = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        // Clear auth (token/session) logic here if needed
        console.log("Logging out...");
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                
                {/* Logo */}
                <button className="text-2xl font-bold text-white" onClick={() => navigate("/dashboard")}>
                    HEALTHCARE
                </button>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex space-x-6 text-white">
                    <Link to="/dashboard" className="hover:text-gray-300 transition">Dashboard</Link>
                    <Link to="/appointments" className="hover:text-gray-300 transition">Appointments</Link>
                    <Link to="/profile" className="hover:text-gray-300 transition">Profile</Link>
                </nav>

                {/* Profile/Logout */}
                <div className="hidden lg:flex items-center space-x-4">
                    <button
                        onClick={() => navigate("/profile")}
                        className="text-white hover:text-gray-300 transition"
                    >
                        <User size={24} />
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
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
