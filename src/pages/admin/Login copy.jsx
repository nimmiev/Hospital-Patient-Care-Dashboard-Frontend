import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const loginApiRoutes = [
    { path: "/api/admin/login", role: "Admin", redirect: "/admin" },
    { path: "/api/patient/login", role: "Patient", redirect: "/patient" },
    { path: "/api/doctor/login", role: "Doctor", redirect: "/doctor" },
    { path: "/api/staff/login", role: "Staff", redirect: "/staff" },
  ];

  // Email Regex for validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // const loginformSubmitHandler = async (e) => {
  //   e.preventDefault();
  
  //   if (!data.email.trim()) return toast.error("Email is required");
  //   if (!isValidEmail(data.email)) return toast.error("Please enter a valid email");
  //   if (!data.password.trim()) return toast.error("Password is required");
  
  //   let found = false;
  
  //   for (let api of loginApiRoutes) {
  //     try {  
  //       const res = await axiosInstance.put(api.path, data, { withCredentials: true });
  
  //       if (res.data?.data?.role === api.role) {
  //         const token = res.data.data.token;
        
  //         // Save token and role
  //         localStorage.setItem("token", token);
  //         localStorage.setItem("role", api.role);
        
  //         // Set Authorization header globally for future API calls
  //         axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        
  //         toast.success(`Logged in as ${api.role}`);
  //         navigate(api.redirect);
  //         found = true;
  //         break;
  //       }
        
  //     } catch (err) {
  //       // console.log(err?.response?.status, err?.response?.data?.message);
  //       const status = err?.response?.status;
  //       // Show toast for errors except 404
  //       if (status !== 404) {
  //         // ❗ Only show errors other than 404
  //         toast.error(err.response?.data?.message || "Login failed");
  //         return;
  //       }
  //     }
  //   }
  
  //   if (!found) {
  //     toast.warning("User not found in any category.");
  //   }
  // };
  // -------------------------------------------------------------------------------
  // const loginformSubmitHandler = async (e) => {
  //   e.preventDefault();
  
  //   if (!data.email.trim()) return toast.error("Email is required");
  //   if (!isValidEmail(data.email)) return toast.error("Please enter a valid email");
  //   if (!data.password.trim()) return toast.error("Password is required");
  
  //   let found = false;
  
  //   for (let api of loginApiRoutes) {
  //     try {
  //       const res = await axiosInstance.put(api.path, data, { withCredentials: true });
  // console.log(res)
  // console.log(api.role)
  //       // Ensure only successful responses are processed
  //       if (res.status === 200 && res.data?.data?.role === api.role) {
  //         const token = res.data.data.token;
  
  //         localStorage.setItem("token", token);
  //         localStorage.setItem("role", api.role);
  //         axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
  //         toast.success(`Logged in as ${api.role}`);
  //         navigate(api.redirect);
  //         found = true;
  //         break;
  //       }
  //     } catch (err) {
  //       // console.log(err)
  //       const status = err?.response?.status;
  //       const message = err?.response?.data?.message;
  
  //       // Show toast for specific errors (like staff not approved)
  //       if (status === 403 || status === 401) {
  //         toast.error(message || "Login failed");
  //         return; // Prevent looping to other roles
  //       }
  
  //       if (status !== 404) {
  //         toast.error(message || "Login failed");
  //         return;
  //       }
  //     }
  //   }
  
  //   if (!found) {
  //     toast.warning("User not found in any category.");
  //   }
  // };
  const loginformSubmitHandler = async (e) => {
    e.preventDefault();
  
    if (!data.email.trim()) return toast.error("Email is required");
    if (!isValidEmail(data.email)) return toast.error("Please enter a valid email");
    if (!data.password.trim()) return toast.error("Password is required");
  
    try {
      let res;
  
      // Admin
      res = await axiosInstance.put("/api/admin/login", data, { withCredentials: true });
      if (res.status === 200 && res.data?.data?.role === "Admin") {
        const token = res.data.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("role", "Admin");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        toast.success("Logged in as Admin");
        return navigate("/admin");
      }
  
      // Patient
      else if ((res = await axiosInstance.put("/api/patient/login", data, { withCredentials: true })) &&
               res.status === 200 && res.data?.data?.role === "Patient") {
        const token = res.data.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("role", "Patient");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        toast.success("Logged in as Patient");
        return navigate("/patient");
      }
  
      // Doctor
      else if ((res = await axiosInstance.put("/api/doctor/login", data, { withCredentials: true })) &&
               res.status === 200 && res.data?.data?.role === "Doctor") {
        const token = res.data.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("role", "Doctor");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        toast.success("Logged in as Doctor");
        return navigate("/doctor");
      }
  
      // Staff
      else if ((res = await axiosInstance.put("/api/staff/login", data, { withCredentials: true })) &&
               res.status === 200 && res.data?.data?.role === "Staff") {
        const token = res.data.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("role", "Staff");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        toast.success("Logged in as Staff");
        return navigate("/staff");
      }
  
      // If none matched
      toast.warning("User not found in any category.");
  
    } catch (err) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message;
  
      if (status === 403 || status === 401) return toast.error(message || "Login failed");
      if (status !== 404) return toast.error(message || "Login failed");
  
      toast.warning("User not found in any category.");
    }
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
        <div className="w-1/2 hidden md:block">
          <img src="/images/login.jpg" alt="Login Illustration" className="w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form className="space-y-4" onSubmit={loginformSubmitHandler}>
            <input
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => formchangeHandler(e, "email")}
              className="input input-bordered w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => formchangeHandler(e, "password")}
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary w-full">Login</button>
          </form>
          <p className="text-center mt-4">
            Don't have an account?
            <Link to="/signup" className="text-blue-500 ml-1">Sign Up</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
