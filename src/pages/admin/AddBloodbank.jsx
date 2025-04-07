import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBloodbank = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bloodGroup: "",
    quantity: "",
    hospitalName: "",
    location: "",
    contactNumber: "",
    available: true,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!formData.quantity || formData.quantity <= 0)
      newErrors.quantity = "Quantity must be a positive number";
    if (!formData.hospitalName.trim()) newErrors.hospitalName = "Hospital name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.contactNumber || !/^\d{10}$/.test(formData.contactNumber))
      newErrors.contactNumber = "Valid 10-digit contact number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post("/api/admin/add-bloodbank", formData);
      toast.success("Bloodbank added successfully!");
      setTimeout(() => {
          navigate("/admin/bloodbank");
      }, 1500); // wait for 1.5 seconds before navigating
    } catch (err) {
      console.error(err);
      toast.error("Failed to add bloodbank");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-base-100 rounded-xl shadow-xl border border-base-200">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">Add Bloodbank</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Blood Group */}
        <div>
          <label className="label font-semibold">Blood Group</label>
          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}  className="select select-bordered w-full" >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          {errors.bloodGroup && <p className="text-red-500 text-sm">{errors.bloodGroup}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className="label font-semibold">Quantity (in units)</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange}  className="input input-bordered w-full" />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
        </div>

        {/* Hospital Name */}
        <div>
          <label className="label font-semibold">Hospital Name</label>
          <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange}  className="input input-bordered w-full" />
          {errors.hospitalName && <p className="text-red-500 text-sm">{errors.hospitalName}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="label font-semibold">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange}  className="input input-bordered w-full" />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>

        {/* Contact Number */}
        <div>
          <label className="label font-semibold">Contact Number</label>
          <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange}  className="input input-bordered w-full" maxLength={10} />
          {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
        </div>

        {/* Available */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox" name="available" checked={formData.available} onChange={handleChange}  className="checkbox checkbox-primary" />
          <label className="label font-semibold">Available</label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
            ← Back
          </button>
          <button type="submit" className="btn btn-primary">
            Add Bloodbank
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddBloodbank;
