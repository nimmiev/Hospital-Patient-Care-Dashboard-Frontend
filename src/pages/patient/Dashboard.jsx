import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../config/axiosInstance";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [instructions, setInstructions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [appointments, setAppointments] = useState([]);

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
        setAppointmentCount(res.data.count);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      }
    };

    const fetchInstructions = async () => {
      try {
        const res = await axiosInstance.get('/api/instruction/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(res)
        setInstructions(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch instructions", err);
      }
    };

    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get("/api/patient/appointment/today", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log(res)
        setAppointments(res.data.data || []);
      } catch (error) {
        console.error("Error fetching today's appointments:", error);
      }
    };

   fetchUser();
    fetchCountAppointments();
    fetchInstructions();
    fetchAppointments();
  }, [navigate]);

  // Auto-slide for instructions carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % instructions.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [instructions]);

  if (!userData) return <div className="text-center py-10">Loading...</div>;

  const formatTimeTo12Hour = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {userData.name}!</h2>

      {/* Instructions Carousel */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">General Instructions</h3>
        {instructions.length > 0 && (
          <div className="carousel w-full mb-10">
            <div className="carousel-item w-full transition duration-700 ease-in-out">
              <div className="card bg-base-100 shadow-xl border border-gray-300 p-6">
                <h4 className="text-lg font-bold text-primary mb-2">
                  {instructions[currentIndex].title}
                </h4>
                <p className="text-gray-600">{instructions[currentIndex].description}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Appointment Count Card */}
        <div className="card shadow-xl bg-base-100 border border-gray-200 md:col-span-1">
          <div className="card-body text-center">
            <h2 className="text-lg font-semibold text-gray-600">Your Appointments</h2>
            <p className="text-5xl font-bold text-primary">{appointmentCount}</p>
            <div className="mt-2">
              <span className="badge badge-outline badge-primary">Total Appointments</span>
            </div>
          </div>
        </div>

        {/* Today's Appointments */}
        <ul className="list bg-base-100 rounded-box shadow-md md:col-span-2">
          <li className="p-4 pb-2 tracking-wide text-lg font-semibold text-gray-600">
            Today's Appointments
          </li>

          {/* Subheading row */}
          <li className="px-4 pb-2 flex justify-between text-xs text-gray-500 font-semibold uppercase">
            <span>#</span>
            <span>Doctor Name</span>
            <span>Appointment Time</span>
          </li>

          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <li
                key={appointment._id}
                className="list-row p-4 flex justify-between items-center border-t border-gray-200"
              >
                <div className="text-2xl font-thin opacity-50">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="font-medium">
                  {appointment.doctorId?.name || "Doctor"}
                </div>
                <div className="text-sm text-primary font-semibold">
                {formatTimeTo12Hour(appointment.appointmentTime)}
</div>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-gray-400 italic">
              No appointment for today
            </li>
          )}
        </ul>

      </div>
    </div>
  );
};

export default Dashboard;
