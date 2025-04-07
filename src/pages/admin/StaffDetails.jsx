import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const StaffDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/admin/staff/${id}`);
        // console.log(response)
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
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!staff) {
    return <div className="flex justify-center items-center h-screen text-red-500">Staff not found!</div>;
  }

//   console.log(staff)
//   const user = staff.userId;

  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-4">← Back</button>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <img 
            src={staff.profilepic}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg"; }}
            alt="Staff Profile"
            className="w-24 h-24 rounded-full mx-auto mb-3"
          />
          <h2 className="text-2xl font-bold">{staff.name}</h2>
          <p className="text-gray-500">{staff.email}</p>
          <p className="text-gray-500">{staff.phone}</p>
        </div>

        <div className="divider"></div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-primary">Staff Information</h3>
          <p><strong>Role Description:</strong> {staff.roleDescription}</p>
          <p><strong>Task Assigned:</strong> {staff.assignedTask ? "Yes" : "No"}</p>
          <p><strong>Task Count:</strong> {staff.taskCount}</p>
          <p><strong>Approved:</strong> {staff.approved ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;
