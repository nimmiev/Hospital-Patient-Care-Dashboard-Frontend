import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Import social icons

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto flex flex-col items-center text-center space-y-6 lg:flex-row lg:justify-between lg:text-left">
                
                {/* Logo and Copyright */}
                <div className="flex flex-col items-center lg:items-start">
                    <button className="text-2xl font-bold text-white mb-2" onClick={() => navigate("/")}>
                        HEALTHCARE
                    </button>
                    <p className="text-sm">&copy; {new Date().getFullYear()}. All rights reserved.</p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-2 text-sm">
                    <h6 className="text-lg text-white font-semibold">Quick Links</h6>
                    <Link to="/" className="hover:text-gray-400 transition">Home</Link>
                    <Link to="/about" className="hover:text-gray-400 transition">About</Link>
                    {/* <Link to="/contact" className="hover:text-gray-400 transition">Contact</Link> */}
                </div>

                {/* Legal Links */}
                <div className="flex flex-col space-y-2 text-sm">
                    <h6 className="text-lg text-white font-semibold">Legal</h6>
                    <button onClick={() => navigate("/terms")} className="hover:text-gray-400 transition">Terms of Use</button>
                    <button onClick={() => navigate("/privacy")} className="hover:text-gray-400 transition">Privacy Policy</button>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <Facebook size={24} className="text-white hover:text-gray-400 transition" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter size={24} className="text-white hover:text-gray-400 transition" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <Instagram size={24} className="text-white hover:text-gray-400 transition" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <Linkedin size={24} className="text-white hover:text-gray-400 transition" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
