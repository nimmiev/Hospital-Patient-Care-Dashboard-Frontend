import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }, []);


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

const loginformSubmitHandler = async (e) => {
  e.preventDefault();

  if (!data.email.trim()) return toast.error("Email is required");
  if (!isValidEmail(data.email)) return toast.error("Please enter a valid email");
  if (!data.password.trim()) return toast.error("Password is required");

  setLoading(true);

  // If role is selected
  if (role) {
    const route = loginApiRoutes.find(r => r.role === role);
    if (!route) {
      setLoading(false);
      return toast.error("Invalid role selected.");
    }

    try {
      const res = await axiosInstance.put(route.path, data, { withCredentials: true });
      if (res.status === 200 && res.data?.data?.role === route.role) {
        const token = res.data.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("role", route.role);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        toast.success(`Logged in as ${route.role}`);
        return navigate(route.redirect);
      }
    } catch (err) {
      const backendMsg = err?.response?.data?.message;
      toast.error(backendMsg || "Login failed")
    }

    setLoading(false);
    return;
  }

  // If no role selected, try admin login
  const adminRoute = loginApiRoutes.find(r => r.role === "Admin");
  try {
    const res = await axiosInstance.put(adminRoute.path, data, { withCredentials: true });
    if (res.status === 200 && res.data?.data?.role === "Admin") {
      const token = res.data.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", "Admin");
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success(`Logged in as Admin`);
      return navigate(adminRoute.redirect);
    }
  } catch (err) {
    const status = err?.response?.status;
    if (status === 401 || status === 403 || status === 404) {
      toast.info("Please select a role");
    } else {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  }

  setLoading(false);
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
            <select className="select select-bordered w-full" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Staff">Staff</option>
            </select>
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
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

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
