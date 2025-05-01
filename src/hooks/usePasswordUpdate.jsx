// hooks/usePasswordUpdate.js
import { useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from 'react-toastify';

export const usePasswordUpdate = () => {
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [ploading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validatePassword = () => {
    const errs = {};
    if (!passwordData.password || passwordData.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (passwordData.password !== passwordData.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    if (ploading) return;
    try {
      setLoading(true);

      await axiosInstance.put("/api/patient/profile/password", passwordData);
      toast("Password updated successfully");
      setPasswordData({ password: "", confirmPassword: "" });
    } catch {
      toast("Failed to update password");
    }   finally {
      setLoading(false); // stop loading
    }
  };

  return {
    passwordData,
    handlePasswordChange,
    handlePasswordSubmit,
    errors,
    ploading
  };
};
