// hooks/usePatientProfileForm.js
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from 'react-toastify';

export const usePatientProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyContact: { name: "", phone: "" },
    bloodType: "",
    height: "",
    weight: "",
    smoking: false,
    alcoholConsumption: false,
    imageUrl: ""
  });

  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/api/patient/profile");
        setFormData(res.data?.data || {});
      } catch {
        toast("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields
    if (name.startsWith("emergencyContact.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        emergencyContact: { ...prev.emergencyContact, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // console.log("Selected image file:", file);
    if (!file) return;
  
    // Optional: validate type and size
    if (!file.type.startsWith("image/")) {
      toast("Please upload a valid image file");
      return;
    }
  
    if (file.size > 5 * 1024 * 1024) {
      toast("Image must be less than 5MB");
      return;
    }
  
    setSelectedImageFile(file);
  
    const imagePreviewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, imageUrl: imagePreviewUrl })); // for preview only
  };
  
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Valid 10-digit phone required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.bloodType) newErrors.bloodType = "Blood Type is required";

    if (!formData.emergencyContact?.name) newErrors["emergencyContact.name"] = "Emergency name required";
    if (!formData.emergencyContact?.phone || !/^\d{10}$/.test(formData.emergencyContact.phone))
      newErrors["emergencyContact.phone"] = "Valid emergency contact phone required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const res = await axiosInstance.put("/api/patient/profile/update", formData);
//       toast("Profile updated successfully");
//       setMessage(res.data.message || "");
//     } catch {
//       toast("Failed to update profile");
//     }
//   };
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    const form = new FormData();
  
    for (let key in formData) {
      if (typeof formData[key] === "object" && formData[key] !== null) {
        form.append(key, JSON.stringify(formData[key]));
      } else {
        form.append(key, formData[key]);
      }
    }
  
    if (selectedImageFile) {
      form.append("profilepic", selectedImageFile);
    }
  
    try {
      const res = await axiosInstance.put("/api/patient/profile/update", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      toast("Profile updated successfully!");
      setMessage("Profile updated successfully!");
    } catch (error) {
      toast("Failed to update profile");
    }
  };
  
  return {
    formData,
    setFormData,
    handleChange,
    handleCheckboxChange,
    handleImageChange,
    handleSubmit,
    errors,
    message,
  };
  
};
