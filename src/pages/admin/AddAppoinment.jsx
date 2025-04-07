import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';

const AddAppoinment = () => {
  const { id } = useParams(); // Patient ID from URL
//   console.log({id})
  const navigate = useNavigate();

  const [appointmentData, setAppointmentData] = useState({
    patientId: id,
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
  });

  const [doctors, setDoctors] = useState([]);

  // Fetch doctors list
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axiosInstance.get('/api/admin/doctors');
        // console.log(res)
        setDoctors(res.data.data);
      } catch (error) {
        toast.error("Failed to load doctors");
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('api/admin/schedule', appointmentData);
      console.log(res)
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/admin/appoinments");
      }, 1500); // wait for 1.5 seconds before navigating
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Schedule Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label font-semibold">Doctor</label>
          <select
            name="doctorId"
            value={appointmentData.doctorId}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label font-semibold">Date</label>
          <input
            type="date"
            name="appointmentDate"
            value={appointmentData.appointmentDate}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label font-semibold">Time</label>
          <input
            type="time"
            name="appointmentTime"
            value={appointmentData.appointmentTime}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success w-full">
            Add Appointment
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddAppoinment;
