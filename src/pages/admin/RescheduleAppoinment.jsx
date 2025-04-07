import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RescheduleAppoinment = () => {

  const { appoinmentId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    doctorId: ""
  });

   
  const [errors, setErrors] = useState({});
  const [doctors, setDoctors] = useState([]);


  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        // fetch appoinment details
        const res = await axiosInstance.get(`/api/admin/appoinment/${appoinmentId}`);
        // console.log(res)
        const data = res.data.data;
  
        // fetch doctors
        const docRes = await axiosInstance.get("/api/admin/doctors");
        // console.log(docRes)
        const doctorList = docRes.data.data;

        const formatDateForInput = (dateStr) => {
          const [day, month, year] = dateStr.split("-");
          return `${year}-${month}-${day}`; // "2025-03-20"
        };
      
        const formatTimeForInput = (timeStr) => {
          const [startTime] = timeStr.split(" - "); // "10:00 AM"
          const [time, meridian] = startTime.split(" "); // "10:00", "AM"
          let [hours, minutes] = time.split(":");
        
          if (meridian === "PM" && hours !== "12") {
            hours = String(Number(hours) + 12);
          }
          if (meridian === "AM" && hours === "12") {
            hours = "00";
          }
        
          return `${hours}:${minutes}`; // returns "14:30"
        };
        

        setFormData({
          appointmentDate: data.appointmentDate,
          appointmentTime: data.appointmentTime,
          doctorId: data.doctorId,
        });
        

        setDoctors(doctorList); // store doctor list in state
        
      } catch (error) {
        console.error("Error fetching appointment or doctors:", error);
      }
    };
  
    if (appoinmentId) {
      fetchAppointmentDetails();
    }
  }, [appoinmentId]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const err = {};
    const now = new Date();
    const selectedDate = new Date(formData.appointmentDate);
  
    if (!formData.doctorId) err.doctorId = "Doctor is required";
  
    if (!formData.appointmentDate) {
      err.appointmentDate = "Date is required";
    } else if (selectedDate.toDateString() < now.toDateString()) {
      err.appointmentDate = "Date cannot be in the past";
    }
  
    if (!formData.appointmentTime) {
      err.appointmentTime = "Time is required";
    } else if (selectedDate.toDateString() === now.toDateString()) {
      const [hour, minute] = formData.appointmentTime.split(":");
      const selectedTime = new Date(formData.appointmentDate);
      selectedTime.setHours(parseInt(hour));
      selectedTime.setMinutes(parseInt(minute));
      if (selectedTime <= now) {
        err.appointmentTime = "Time must be in the future";
      }
    }
  
    return err;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axiosInstance.post(`/api/admin/reschedule/${appoinmentId}`, formData );
        // console.log("Raw appointmentDate from API:", res);

        toast.success(res.data.message || "Appointment rescheduled successfully");

        // Redirect to appointment list page after a short delay
        setTimeout(() => {
          navigate("/admin/appoinments");
        }, 1500);

      } catch (error) {
        console.error("Reschedule error:", error);
        toast.error(
          error.response?.data?.message || "Failed to reschedule appointment"
        );
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
      
      <h2 className="text-xl font-semibold mb-4 text-primary">Reschedule Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* <div>
          <label className="block font-medium mb-1">Doctor</label>
          <select
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor.name}>
                {doctor.name}
              </option>
            ))}
          </select>
          {errors.doctorName && <p className="text-red-500 text-sm mt-1">{errors.doctorName}</p>}
        </div> */}
        <div>
          <label className="block font-medium mb-1">Doctor</label>
          <select
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
          {errors.doctorId && (
            <p className="text-red-500 text-sm mt-1">{errors.doctorId}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Appointment Date</label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.appointmentDate && <p className="text-red-500 text-sm mt-1">{errors.appointmentDate}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Appointment Time</label>
          <input
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.appointmentTime && <p className="text-red-500 text-sm mt-1">{errors.appointmentTime}</p>}
        </div>

        <div className="flex justify-between items-center mb-4">
          {/* Back navigating button */}
          <button type="radio" onClick={() => navigate(-1)} name="my_tabs_6" className="btn btn-secondary mb-4" >← Back</button>
          
          <button type="submit" className="btn btn-primary w-half">
            Reschedule
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RescheduleAppoinment;
