import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Sidebar, X, LogOut, User } from "lucide-react"; // Icons
import { axiosInstance } from "../../config/axiosInstance";


const DashbordHeader = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [userData, setUserData] = useState({});
      
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
// console.log("role:", role)
        if (!token || !role) {
            navigate("/"); // or navigate("/login");
        }

        const fetchUser = async () => {
            try {
  
              const role = localStorage.getItem("role")?.toLowerCase(); // e.g., 'admin', 'doctor', 'staff', etc.
            //   console.log("role:", role)
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


        // console.log("userData", userData.profilepic)

     // Logout function
     const handleLogout = async () => {
        try {
            const role = localStorage.getItem("role")?.toLowerCase(); // e.g., 'admin', 'doctor', 'staff', etc.
console.log(role)
          let apiUrl = "/api/logout"; // default value
      
          // Set API endpoint based on role
          if (role) {
            apiUrl = `/api/${role}/logout`;
          }
    //   console.log(apiUrl)
          await axiosInstance.put(apiUrl);
      
          // Clear localStorage/sessionStorage values
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.setItem("theme", "light"); // Reset theme to default
      
          navigate("/"); // Redirect to home page after logout
        } catch (error) {
          console.error("Logout failed:", error.message);
        }
      } 

    return (
        <>
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
                        <Link to="/contact" className="hover:text-gray-300 transition">Contact us</Link>
                    </nav>

                    {/* Profile/Logout */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link to="/patient">
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img src={userData.profilepic} />
                                </div>
                            </div>
                        </Link>
                        {/* <button
                            onClick={() => navigate("/profile")}
                            className="text-white hover:text-gray-300 transition"
                        >
                            <User size={24} />
                        </button> */}
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
        </>
    );
};

export default DashbordHeader;
