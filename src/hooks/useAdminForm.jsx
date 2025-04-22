import { useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from 'react-toastify';

export const useAdminForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast("Please fix the errors before submitting.");
      return;
    }
    setMessage("");

    try {
      const response = await axiosInstance.post("/api/admin/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage(response.data.message);
      toast(response.data.message || "Signup successful!");
      
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });

    //   setTimeout(() => {
    //     navigate("/admin/account");
    // }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
      toast(error.response?.data?.message || "Signup failed!");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    errors,
  };
  
}
  