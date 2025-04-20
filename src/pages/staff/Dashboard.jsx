import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../config/axiosInstance";
import { useUserData } from "../../hooks/useUserData"

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData, loading } = useUserData();
  const [task, setTask] = useState(null);
  const [bloodCount, setBloodCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [instructions, setInstructions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchTask = async () => {
      try {
        const response = await axiosInstance.get("/api/staff/taskForToday", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response)
        setTask(response.data.data); // Assuming it's an array
      } catch (error) {
        console.error("Error fetching Task:", error);
      }
    }

    const fetchTaskCount = async () => {
      try {
        const response = await axiosInstance.get("/api/staff/completedtaskCount", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log(response)
        setTaskCount(response.data.count || 0); // Assuming it's an array
      } catch (error) {
        console.error("Error fetching Task count:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get("/api/staff/appoinmentToday", {
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

    const fetchBloodCount = async () => {
      try {
        const res = await axiosInstance.get("/api/staff/bloodbank-count", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBloodCount(res.data.count || 0);
      } catch (error) {
        console.error("Error fetching blood count:", error);
      }
    };

    const fetchInstructions = async () => {
      try {
        const res = await axiosInstance.get("/api/instruction/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInstructions(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch instructions", err);
      }
    };

    fetchTask();
    fetchTaskCount();
    fetchAppointments();
    fetchBloodCount();
    fetchInstructions();
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Welcome, {userData.name}!</h2>

        <button className="btn btn-primary" onClick={() => navigate("/staff/addPatient")}>
          Add Patient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Instructions Carousel */}
        <div className="flex flex-col h-full">
          {instructions.length > 0 && (
            <div className="carousel w-full h-full">
              <div className="carousel-item w-full h-full">
                <div className="card bg-base-100 shadow-xl border border-gray-300 p-6 h-full">
                  <h4 className="text-lg font-bold text-primary mb-2">
                    {instructions[currentIndex].title}
                  </h4>
                  <p className="text-gray-600">{instructions[currentIndex].description}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right side - Two cards stacked horizontally with same height as left */}
        {/* <div className="flex gap-6 items-stretch">
          <div className="card w-1/2 shadow-xl bg-base-100 border border-gray-200 self-stretch">
            <div className="card-body text-center flex flex-col justify-center h-full">
              <h2 className="text-lg font-semibold text-gray-600">Appointments</h2>
              <p className="text-5xl font-bold text-primary">{appointmentCount}</p>
              <div className="mt-2">
                <span className="badge badge-outline badge-primary">Total Appointments</span>
              </div>
            </div>
          </div>
          <div className="card w-1/2 shadow-xl bg-base-100 border border-gray-200 self-stretch">
            <div className="card-body text-center flex flex-col justify-center h-full">
              <h2 className="text-lg font-semibold text-gray-600">Tasks</h2>
              <p className="text-5xl font-bold text-primary">{appointmentCount}</p>
              <div className="mt-2">
                <span className="badge badge-outline badge-primary">Total Task</span>
              </div>
            </div>
          </div>
        </div> */}

        <div className="flex gap-6 items-stretch">
          <div className="card w-1/2 shadow-xl bg-base-100 border border-gray-200 self-stretch">
            <div className="card-body text-center flex flex-col justify-center h-full">
              <h2 className="text-lg font-semibold text-gray-600">Total Tasks</h2>
              <p className="text-5xl font-bold text-primary">{taskCount}</p>
            </div>
          </div>
          <div className="card w-1/2 shadow-xl bg-base-100 border border-gray-200 self-stretch">
            <div className="card-body text-center flex flex-col justify-center h-full">
              <h2 className="text-lg font-semibold text-gray-600">Blood Units</h2>
              <p className="text-5xl font-bold text-primary">{bloodCount}</p>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Today's Tasks */}
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 tracking-wide text-lg font-semibold text-gray-600">
            Today's Task
          </li>

          <li className="px-4 pb-2 flex justify-between text-xs text-gray-500 font-semibold uppercase">
            <span>#</span>
            <span>Task</span>
            <span>Status</span>
          </li>

          <div className="max-h-72 overflow-y-auto">
            {task && task.length > 0 ? (
              task.map((t, index) => (
                <li key={t._id} className="list-row p-4 flex justify-between items-center border-t border-gray-200">
                  <div className="text-2xl font-thin opacity-50">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="font-medium">
                    {t.taskDescription || "Task"}
                  </div>
                  <div className="text-sm text-primary font-semibold">
                    {t.status || "Pending"}
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-400 italic">No task for today</li>
            )}
          </div>
        </ul>


        {/* Today's Appointments */}
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 tracking-wide text-lg font-semibold text-gray-600">
            Today's Appointments
          </li>

          <li className="px-4 pb-2 flex justify-between text-xs text-gray-500 font-semibold uppercase">
            <span>#</span>
            <span>Patient Name</span>
            <span>Doctor Name</span>
            <span>Appointment Time</span>
          </li>

          <div className="max-h-72 overflow-y-auto">
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
                    {appointment.patientId?.name || "Patient"}
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
          </div>
        </ul>
      </div>


    </div>
  );
};

export default Dashboard;
