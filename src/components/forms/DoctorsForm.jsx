import { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { showSuccessToast, showErrorToast } from "../ToastNotification";

export default function DoctorSignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    medicalLicense: "",
    qualification: "",
    experience: "", 
    department: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // validation
  const validateForm = () => {
    // console.log("Validating form...");
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
  
    if (!formData.medicalLicense.trim()) {
      newErrors.medicalLicense = "Medical License Number is required";
    }
  
    if (!formData.qualification.trim()) {
      newErrors.qualification = "Qualification is required";
    }
  
    if (!formData.experience) {
      newErrors.experience = "Experience is required";
    } else if (isNaN(formData.experience) || Number(formData.experience) < 0) {
      newErrors.experience = "Experience must be a valid number";
    }
  
    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }
  
    console.log("Validation Errors:", newErrors); // Debugging
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // clear error
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  
  //   // Clear only the specific field's error
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [name]: "",
  //   }));
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      showErrorToast("Please fix the errors before submitting.");
      return;
    }
    setMessage("");

    try {
      const response = await axiosInstance.post("/api/doctor/signup", formData,  {
        headers: { "Content-Type": "application/json" }, });
      
      setMessage(response.data.message);
      showSuccessToast(response.data.message || "Signup successful!");
      
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        medicalLicense: "",
        qualification: "",
        experience: "",
        department: "",
      });

    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
      showErrorToast(error.response?.data?.message || "Signup failed");
    }
    
  };

  return (
    // <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded-lg w-full max-w-md mx-auto">
    //   <h2 className="text-2xl font-bold text-center mb-4">Doctor Signup</h2>
    //   <div className="grid grid-cols-2 gap-4">
    //     <input type="text" name="name" placeholder="Full Name" className="input input-bordered w-full" onChange={handleChange} value={formData.name} required />
    //     <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" onChange={handleChange} value={formData.email} required />
    //     <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" onChange={handleChange} value={formData.password} required />
    //     <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input input-bordered w-full" onChange={handleChange} value={formData.confirmPassword} required />
    //     <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full" onChange={handleChange} value={formData.phone} required />
    //     <input type="text" name="medicalLicense" placeholder="Medical License Number" className="input input-bordered w-full" onChange={handleChange} value={formData.medicalLicense} required />
    //     <input type="text" name="qualification" placeholder="Qualification" className="input input-bordered w-full" onChange={handleChange} value={formData.qualification} required />
    //     <input type="text" name="experience" placeholder="Years of Experience" className="input input-bordered w-full" onChange={handleChange} value={formData.experience} required />
    //     <input type="text" name="department" placeholder="Department" className="input input-bordered w-full" onChange={handleChange} value={formData.department} required />
    //   </div>
    //   <button type="submit" className="btn btn-primary w-full mt-4">Signup</button>
    // </form>
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Doctor Signup</h2>
      
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

        <div>
          <input type="text" name="medicalLicense" placeholder="Medical License Number" className="input input-bordered w-full" onChange={handleChange} value={formData.medicalLicense} required />
          {errors.medicalLicense && <p className="text-red-500 text-sm">{errors.medicalLicense}</p>}
        </div>

        <div>
          <input type="text" name="qualification" placeholder="Qualification" className="input input-bordered w-full" onChange={handleChange} value={formData.qualification} required />
          {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification}</p>}
        </div>

        <div>
          <input type="text" name="experience" placeholder="Years of Experience" className="input input-bordered w-full" onChange={handleChange} value={formData.experience} required />
          {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
        </div>

        <div>
          <input type="text" name="department" placeholder="Department" className="input input-bordered w-full" onChange={handleChange} value={formData.department} required />
          {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
        </div>
      </div>

      {message && <p className="text-center text-green-600">{message}</p>}

      <button type="submit" className="btn btn-primary w-full mt-4" >Signup</button>
    </form>
  );
}
