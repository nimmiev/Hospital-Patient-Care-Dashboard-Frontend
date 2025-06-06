import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const Profile = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/api/staff/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
// console.log(res.data.data)
        setStaff(res.data.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!staff) return <div className="text-center py-10">Loading profile...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl border border-gray-200">
        <div className="card-body">

          {/* Profile Heading */}
          <h2 className="text-3xl font-bold text-center text-primary mb-6">Staff Profile</h2>

          {/* Profile Picture + Basic Info (Centered) */}
          <div className="flex flex-col items-center mb-10 space-y-3">
          <img
            src={staff.profilepic || "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1744124857~exp=1744128457~hmac=3023308ffbb4c6aadb3d43f6b829a55f7893f5a77c87d5fda05cff2c840e4106&w=740"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-primary object-cover"
            onError={(e) => {
                e.target.onerror = null; // prevents infinite loop if fallback also fails
                e.target.src = "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1744124857~exp=1744128457~hmac=3023308ffbb4c6aadb3d43f6b829a55f7893f5a77c87d5fda05cff2c840e4106&w=740";
            }}
            />
            <h3 className="text-xl font-semibold">{staff.name}</h3>
            <p className="text-gray-600">{staff.email}</p>
            <p className="text-gray-600">{staff.phone}</p>
            <span className="badge badge-outline">{staff.role} : {staff.roleDescription}</span>
            <p className={`${ staff.status === true ? 'text-green-600' : staff.status === false ? 'text-red-500' : 'text-yellow-500' }`}> {
                    staff.status === true ? "Accepted" :
                    staff.status === false ? "Rejected" : "Requested" }
                </p>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-8 text-right">
          <button
            className="btn btn-outline btn-primary"
            onClick={() => navigate("/staff/settings")}
            >
            Edit Profile
          </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
