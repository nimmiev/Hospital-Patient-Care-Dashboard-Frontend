import { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { showSuccessToast, showErrorToast } from "../ToastNotification";

export default function StaffSignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roleDescription: "",
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

    if (!formData.roleDescription.trim()) newErrors.roleDescription = "Role Description is required";
    
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
      showErrorToast("Please fix the errors before submitting.");
      return;
    }
    setMessage("");

    try {
      const response = await axiosInstance.post("/api/staff/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage(response.data.message);
      showSuccessToast(response.data.message || "Signup successful!");
      
      setFormData({
        name: "",
        email: "",
        roleDescription: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
      showErrorToast(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded-lg w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Staff Signup</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input type="text" name="name" placeholder="Full Name" className="input input-bordered w-full" onChange={handleChange} value={formData.name} required />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          
          <div>
            <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" onChange={handleChange} value={formData.email} required />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          
          <div>
            <input type="text" name="roleDescription" placeholder="Role Description" className="input input-bordered w-full" onChange={handleChange} value={formData.roleDescription} required />
            {errors.roleDescription && <p className="text-red-500 text-sm">{errors.roleDescription}</p>}
          </div>
          
          <div>
            <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" onChange={handleChange} value={formData.password} required />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          
          <div>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input input-bordered w-full" onChange={handleChange} value={formData.confirmPassword} required />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          
          <div>
            <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full" onChange={handleChange} value={formData.phone} required />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
        </div>

        {message && <p className="text-center text-green-600">{message}</p>}
        
        <button type="submit" className="btn btn-primary w-full mt-4">Signup</button>
      </form>
    </>
  );
}
  