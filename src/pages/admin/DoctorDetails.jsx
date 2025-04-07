import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/admin/doctor/${id}`);
        // console.log(response)
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
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!doctor) {
    return <div className="flex justify-center items-center h-screen text-red-500">Doctor not found!</div>;
  }

//   const user = doctor.userId;
// console.log(user)
  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-4">← Back</button>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <img 
            src={doctor.profilepic}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg"; }}
            alt="Doctor Profile"
            className="w-24 h-24 rounded-full mx-auto mb-3"
          />
          <h2 className="text-2xl font-bold">{doctor.name}</h2>
          <p className="text-gray-500">{doctor.email}</p>
          <p className="text-gray-500">{doctor.phone}</p>
        </div>

        <div className="divider"></div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-primary">Professional Information</h3>
          <p><strong>Medical License:</strong> {doctor.medicalLicense}</p>
          <p><strong>Qualification:</strong> {doctor.qualification}</p>
          <p><strong>Experience:</strong> {doctor.experience}</p>
          <p><strong>Department:</strong> {doctor.department}</p>
          <p><strong>Has Schedule:</strong> {doctor.schedule ? "Yes" : "No"}</p>
          <p><strong>Approved:</strong> {doctor.approved ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
