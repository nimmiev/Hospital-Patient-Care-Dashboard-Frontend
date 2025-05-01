import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useTheme } from "../../components/context/ThemeContext";

const StaffDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/admin/staff/${id}`);
        setStaff(response.data.data);
      } catch (error) {
        console.error("Error fetching staff details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaffDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Staff not found!
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
      <div className="max-w-4xl mx-auto shadow-xl rounded-xl p-6 bg-base-100">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary mb-6"
        >
          ← Back
        </button>

        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <img
            src={staff.profilepic}
            alt="Staff"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg";
            }}
            className="w-24 h-24 rounded-full border border-gray-300 shadow-sm mb-3"
          />
          <h2 className="text-2xl font-bold">{staff.name}</h2>
          <p className="text-sm opacity-70">{staff.email}</p>
          <p className="text-sm opacity-70">{staff.phone}</p>
        </div>

        <div className="divider"></div>

        {/* Staff Information */}
        <div className="grid grid-cols-1 md:grid-colspan-2 gap-4">
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h3 className="card-title text-primary">Staff Information</h3>
              <p><strong>Role Description:</strong> {staff.roleDescription || "N/A"}</p>
              <p><strong>Task Assigned:</strong> {staff.assignedTask ? "Yes" : "No"}</p>
              <p><strong>Task Count:</strong> {staff.taskCount ?? 0}</p>
              <p><strong>Approved:</strong> {staff.approved ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;
