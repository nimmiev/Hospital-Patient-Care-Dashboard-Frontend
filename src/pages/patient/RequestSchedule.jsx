import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestSchedule = () => {
  const { id } = useParams(); // Patient ID from URL
  // console.log({id})
  const navigate = useNavigate();

  const [appointmentData, setAppointmentData] = useState({
    patientId: id,
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axiosInstance.get("/api/patient/doctors");
        // console.log(res)
        setDoctors(res.data.data);
      } catch (error) {
        toast.error("Failed to load doctors");
      }
    };
    fetchDoctors();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!appointmentData.doctorId) newErrors.doctorId = "Please select a doctor";
    if (!appointmentData.appointmentDate) newErrors.appointmentDate = "Please select a date";
    if (!appointmentData.appointmentTime) newErrors.appointmentTime = "Please select a time";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axiosInstance.post("api/patient/request", appointmentData);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/patient/appoinments");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-base-100 rounded-xl shadow-xl border border-base-200">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">Schedule Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Doctor */}
        <div>
          <label className="label font-semibold">Doctor</label>
          <select
            name="doctorId"
            value={appointmentData.doctorId}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name}
              </option>
            ))}
          </select>
          {errors.doctorId && <p className="text-red-500 text-sm">{errors.doctorId}</p>}
        </div>

        {/* Appointment Date */}
        <div>
          <label className="label font-semibold">Date</label>
          <input
            type="date"
            name="appointmentDate"
            value={appointmentData.appointmentDate}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.appointmentDate && <p className="text-red-500 text-sm">{errors.appointmentDate}</p>}
        </div>

        {/* Appointment Time */}
        <div>
          <label className="label font-semibold">Time</label>
          <input
            type="time"
            name="appointmentTime"
            value={appointmentData.appointmentTime}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.appointmentTime && <p className="text-red-500 text-sm">{errors.appointmentTime}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
            ← Back
          </button>
          <button type="submit" className="btn btn-primary">
            Request
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default RequestSchedule;
