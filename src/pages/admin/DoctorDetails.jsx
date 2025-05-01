import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useTheme } from "../../components/context/ThemeContext";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/admin/doctor/${id}`);
        setDoctor(response.data.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        Doctor not found!
      </div>
    );
  }

  return (
    <div data-theme={theme} className="min-h-screen p-6 bg-base-200 text-base-content">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-6">
          ← Back
        </button>

        <div className="card shadow-lg bg-base-100">
          <div className="card-body">
            {/* Profile Section */}
            <div className="text-center mb-4">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
                  <img
                    src={doctor.profilepic}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg";
                    }}
                    alt="Doctor Profile"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold mt-3">{doctor.name}</h2>
              <p className="text-sm opacity-70">{doctor.email}</p>
              <p className="text-sm opacity-70">{doctor.phone}</p>
            </div>

            <div className="divider">Professional Info</div>

            {/* Professional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-base-200 p-4 rounded-box">
                <p><span className="font-semibold">Medical License:</span> {doctor.medicalLicense}</p>
                <p><span className="font-semibold">Qualification:</span> {doctor.qualification}</p>
                <p><span className="font-semibold">Experience:</span> {doctor.experience}</p>
              </div>
              <div className="bg-base-200 p-4 rounded-box">
                <p><span className="font-semibold">Department:</span> {doctor.department}</p>
                <p><span className="font-semibold">Has Schedule:</span> {doctor.schedule ? "Yes" : "No"}</p>
                <p><span className="font-semibold">Approved:</span> {doctor.approved ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
