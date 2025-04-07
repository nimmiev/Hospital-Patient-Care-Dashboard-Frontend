import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBloodbank = () => {
  const { id } = useParams();
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

  useEffect(() => {
    fetchBloodbank();
  }, []);

  const fetchBloodbank = async () => {
    try {
      const res = await axiosInstance.get("/api/admin/bloodbank");
      const bloodbank = res.data.data.find((bb) => bb._id === id);
      if (bloodbank) {
        setFormData(bloodbank);
      } else {
        toast.error("Bloodbank not found");
        navigate("/admin/bloodbank");
      }
    } catch (err) {
      toast.error("Failed to fetch bloodbank data");
      console.error(err);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!formData.quantity || formData.quantity <= 0)
      newErrors.quantity = "Quantity must be a positive number";
    if (!formData.hospitalName) newErrors.hospitalName = "Hospital name is required";
    if (!formData.location) newErrors.location = "Location is required";
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
      await axiosInstance.post(`/api/admin/update-bloodbank/${id}`, formData);
      toast.success("Bloodbank updated successfully!");
      navigate("/admin/bloodbank");
    } catch (err) {
      toast.error("Failed to update bloodbank");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold text-primary mb-4 text-center">Update Bloodbank</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Group</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          {errors.bloodGroup && <span className="text-red-500">{errors.bloodGroup}</span>}
        </div>

        <div>
          <label className="label">Quantity (in units)</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.quantity && <span className="text-red-500">{errors.quantity}</span>}
        </div>

        <div>
          <label className="label">Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.hospitalName && <span className="text-red-500">{errors.hospitalName}</span>}
        </div>

        <div>
          <label className="label">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.location && <span className="text-red-500">{errors.location}</span>}
        </div>

        <div>
          <label className="label">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.contactNumber && <span className="text-red-500">{errors.contactNumber}</span>}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="checkbox"
          />
          <label className="label">Available</label>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            ← Back
          </button>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default UpdateBloodbank;
