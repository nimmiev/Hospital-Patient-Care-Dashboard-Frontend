import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Sidebar, X } from "lucide-react"; // For icons

const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                
                {/* Logo */}
                <button className="text-2xl font-bold text-white" onClick={() => navigate("/")}>
                    HEALTHCARE
                </button>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex space-x-6 text-white">
                    <Link to="/" className="hover:text-gray-300 transition">Home</Link>
                    <Link to="/about" className="hover:text-gray-300 transition">About</Link>
                    {/* <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link> */}
                </nav>

                {/* Contact Button */}
                <button 
                    className="hidden lg:block bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>

                {/* Mobile Menu Toggle */}
                <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-white shadow-md">
                    <nav className="flex flex-col space-y-4 py-4 text-center">
                        <Link to="/" className="py-2 text-gray-700 hover:bg-gray-200 transition" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link to="/about" className="py-2 text-gray-700 hover:bg-gray-200 transition" onClick={() => setMenuOpen(false)}>About</Link>
                        <Link to="/contact" className="py-2 text-gray-700 hover:bg-gray-200 transition" onClick={() => setMenuOpen(false)}>Contact</Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;