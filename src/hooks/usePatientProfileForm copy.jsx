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
    imageUrl: "",
    familyHistory: [], // Initializing familyHistory here
  });

  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/api/patient/profile");
        setFormData((prev) => ({
          ...prev,
          ...res.data?.data, // Make sure the response data is merged correctly
        }));
      } catch {
        toast("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name.includes('.')) {
  //     const [parentKey, childKey] = name.split('.');

  //     if (parentKey === 'familyHistory') {
  //       const index = Number(childKey);
  //       const field = name.split('.')[2];

  //       setFormData((prev) => {
  //         const updatedFamilyHistory = [...(prev.familyHistory || [])];
  //         updatedFamilyHistory[index] = {
  //           ...updatedFamilyHistory[index],
  //           [field]: value,
  //         };
  //         return { ...prev, familyHistory: updatedFamilyHistory };
  //       });
  //     } else {
  //       setFormData((prev) => ({
  //         ...prev,
  //         [parentKey]: {
  //           ...prev[parentKey],
  //           [childKey]: value,
  //         },
  //       }));
  //     }
  //   } else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name.includes('.')) {
      const [parentKey, index, field] = name.split('.');
  
      if (parentKey === 'familyHistory') {
        const idx = Number(index); // Get the index of the familyHistory item
  
        setFormData((prev) => {
          const updatedFamilyHistory = [...(prev.familyHistory || [])];
          updatedFamilyHistory[idx] = {
            ...updatedFamilyHistory[idx], // Spread the existing object
            [field]: value, // Update the specific field (condition or relation)
          };
          return { ...prev, familyHistory: updatedFamilyHistory };
        });
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
    setFormData((prev) => ({ ...prev, imageUrl: imagePreviewUrl })); // Preview only
  };

  const handleAddFamilyHistory = () => {
    setFormData((prev) => ({
      ...prev,
      familyHistory: [
        ...(Array.isArray(prev.familyHistory) ? prev.familyHistory : []),
        { disease: "", relation: "" },
      ],
    }));
  };

  const handleRemoveFamilyHistory = (index) => {
    setFormData((prev) => ({
      ...prev,
      familyHistory: (Array.isArray(prev.familyHistory) ? prev.familyHistory : []).filter((_, i) => i !== index),
    }));
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;

  //   const form = new FormData();
  //   for (let key in formData) {
  //     if (typeof formData[key] === "object" && formData[key] !== null) {
  //       form.append(key, JSON.stringify(formData[key]));
  //     } else {
  //       form.append(key, formData[key]);
  //     }
  //   }

  //   if (selectedImageFile) {
  //     form.append("profilepic", selectedImageFile);
  //   }

  //   try {
  //     const res = await axiosInstance.put("/api/patient/profile/update", form, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     toast("Profile updated successfully!");
  //     setMessage("Profile updated successfully!");
  //   } catch (error) {
  //     toast("Failed to update profile");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    const form = new FormData();
  
    // Iterate through the form data to append each field to FormData
    for (let key in formData) {
      if (typeof formData[key] === "object" && formData[key] !== null) {
        // Stringify arrays or objects before appending
        form.append(key, JSON.stringify(formData[key]));
      } else {
        form.append(key, formData[key]);
      }
    }
  
    // If an image file is selected, append it to FormData
    if (selectedImageFile) {
      form.append("profilepic", selectedImageFile);
    }
  
    try {
      // Make the PUT request with FormData
      const res = await axiosInstance.put("/api/patient/profile/update", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      // Handle success response
      toast("Profile updated successfully!");
      setMessage("Profile updated successfully!");
  
      // Optionally, reset form or perform other actions after a successful update
    } catch (error) {
      // Log the error details to help with debugging
      console.error("Error during profile update:", error);
      if (error.response) {
        // If the error has a response from the backend, display the message
        toast(error.response.data.message || "Failed to update profile");
      } else {
        // If there's no response, show a generic message
        toast("Failed to update profile");
      }
    }
  };
  
  return {
    formData,
    setFormData,
    handleChange,
    handleCheckboxChange,
    handleImageChange,
    handleSubmit,
    handleAddFamilyHistory,
    handleRemoveFamilyHistory,
    errors,
    message,
  };
};
