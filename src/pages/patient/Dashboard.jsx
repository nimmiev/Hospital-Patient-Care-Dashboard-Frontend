import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../config/axiosInstance";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/patient/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(res.data.data);
      } catch (err) {
        console.error("User fetch failed", err);
        navigate("/login");
      }
    };

    const fetchCountAppointments = async () => {
      try {
        const res = await axiosInstance.get("/api/patient/appoinment-count", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // console.log(res.data.count)
        setAppointmentCount(res.data.count);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      }
    };

    fetchUser();
    fetchCountAppointments();
  }, [navigate]);

  if (!userData) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {userData.name}!</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Appointment Count Card */}
        <div className="card shadow-xl bg-base-100 border border-gray-200">
          <div className="card-body text-center">
            <h2 className="text-lg font-semibold text-gray-600">Your Appointments</h2>
            <p className="text-5xl font-bold text-primary">{ appointmentCount }</p>
            <div className="mt-2">
              <span className="badge badge-outline badge-primary">Total Appointments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

