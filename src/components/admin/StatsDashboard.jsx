import { FaUserInjured, FaUserMd, FaUsers, FaTint, FaCalendarCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const StatsDashboard = () => {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    serviceStaff: 0,
    bloodbanks: 0,
    appointments: 0,
  });
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const endpoints = {
          patients: "/api/admin/patient-count",
          doctors: "/api/admin/count-doctor",
          serviceStaff: "/api/admin/staff-count",
          bloodbanks: "/api/admin/bloodbank-count",
          appointments: "/api/admin/appoinment-count",
        };

        const requests = Object.entries(endpoints).map(async ([key, url]) => {
          try {
            const response = await axiosInstance.get(url);
            // console.log(`${key} response:`, response.data); // Debugging
            
            return { [key]: response.data.count ?? 0 }; // Ensure correct data access
          } catch (error) {
            if (error.response && error.response.status === 401) {
              navigate("/error");
            }
            console.error(`Error fetching ${key}:`, error.message);
            return { [key]: 0 };
          }
        });

        const results = await Promise.all(requests);
        const newStats = results.reduce((acc, item) => ({ ...acc, ...item }), {});
        
        setStats(newStats);
      } catch (error) {
        console.error("Error fetching stats:", error.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      <div className="bg-base-100 shadow-lg rounded-2xl p-6 border border-base-content/10 flex flex-col items-center">
        <FaUserInjured className="text-4xl text-primary" />
        <div className="stat-title">Patients</div>
        <div className="stat-value text-primary">{stats.patients}</div>
        <div className="stat-desc">From Jan 1st - Feb 1st</div>
      </div>

      <div className="bg-base-100 shadow-lg rounded-2xl p-6 border border-base-content/10 flex flex-col items-center">
        <FaUserMd className="text-4xl text-secondary" />
        <div className="stat-title">Doctors</div>
        <div className="stat-value text-secondary">{stats.doctors}</div>
        {/* <div className="stat-desc">↗︎ 40 (2%)</div> */}
      </div>

      <div className="bg-base-100 shadow-lg rounded-2xl p-6 border border-base-content/10 flex flex-col items-center">
        <FaUsers className="text-4xl text-accent" />
        <div className="stat-title">Service Staffs</div>
        <div className="stat-value text-accent">{stats.serviceStaff}</div>
        {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
      </div>

      <div className="bg-base-100 shadow-lg rounded-2xl p-6 border border-base-content/10 flex flex-col items-center">
        <FaTint className="text-4xl text-error" />
        <div className="stat-title">Bloodbanks</div>
        <div className="stat-value text-error">{stats.bloodbanks}</div>
        {/* <div className="stat-desc">↗︎ 40 (2%)</div> */}
      </div>

      <div className="bg-base-100 shadow-lg rounded-2xl p-6 border border-base-content/10 flex flex-col items-center">
        <FaCalendarCheck className="text-4xl text-success" />
        <div className="stat-title">Appointments</div>
        <div className="stat-value text-success">{stats.appointments}</div>
        {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
      </div>
    </div>
  );
};

export default StatsDashboard;
