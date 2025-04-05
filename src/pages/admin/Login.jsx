import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const loginApiRoutes = [
    { path: "/api/admin/login", role: "Admin", redirect: "/admin" },
    { path: "/api/patient/login", role: "Patient", redirect: "/patient" },
    { path: "/api/doctor/login", role: "Doctor", redirect: "/doctor" },
    { path: "/api/staff/login", role: "Staff", redirect: "/staff" },
  ];

  const loginformSubmitHandler = async (e) => {
    e.preventDefault();

    for (let api of loginApiRoutes) {
      try {
        const res = await axiosInstance.put(api.path, data, { withCredentials: true });
        if (res.data?.data?.role === api.role) {
          
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("role", api.role);
          
          navigate(api.redirect);
          return; // Stop further API calls if login is successful
        }
      } catch (err) {
        if (err.response?.status !== 404) {
          alert(err.response?.data?.message || "Login failed");
          return; // Stop further attempts if it's not a 404 error
        }
      }
    }
    alert("User not found in any category.");
  };

  const formchangeHandler = (event, field) => {
    setData((prevData) => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex w-[80%] max-w-4xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block">
          <img src="/images/login.jpg" alt="Login Illustration" className="w-full h-full object-cover" />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form className="space-y-4" onSubmit={loginformSubmitHandler}>
            <input type="email" placeholder="Email" value={data.email} onChange={(e) => formchangeHandler(e, "email")} className="input input-bordered w-full" />
            <input type="password" placeholder="Password" value={data.password} onChange={(e) => formchangeHandler(e, "password")} className="input input-bordered w-full" />
            <button className="btn btn-primary w-full">Login</button>
          </form>
          <p className="text-center mt-4">
            Don't have an account?
            <Link to="/signup" className="text-blue-500 ml-1">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
