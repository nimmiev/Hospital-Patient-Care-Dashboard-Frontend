import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const Profile = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/api/patient/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
// console.log(res.data.data)
        setPatient(res.data.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!patient) return <div className="text-center py-10">Loading profile...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl border border-gray-200">
        <div className="card-body">

          {/* Profile Heading */}
          <h2 className="text-3xl font-bold text-center text-primary mb-6">Patient Profile</h2>

          {/* Profile Picture + Basic Info (Centered) */}
          <div className="flex flex-col items-center mb-10 space-y-3">
          <img
            src={patient.profilepic || "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1744124857~exp=1744128457~hmac=3023308ffbb4c6aadb3d43f6b829a55f7893f5a77c87d5fda05cff2c840e4106&w=740"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-primary object-cover"
            onError={(e) => {
                e.target.onerror = null; // prevents infinite loop if fallback also fails
                e.target.src = "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1744124857~exp=1744128457~hmac=3023308ffbb4c6aadb3d43f6b829a55f7893f5a77c87d5fda05cff2c840e4106&w=740";
            }}
            />
            <h3 className="text-xl font-semibold">{patient.name}</h3>
            <p className="text-gray-600">{patient.email}</p>
            <p className="text-gray-600">{patient.phone}</p>
            <span className="badge badge-outline">{patient.role}</span>
          </div>

          {/* Details Grid Below */}
          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base">
            {[
                { label: "Date of Birth", value: new Date(patient.dateOfBirth).toLocaleDateString() },
                { label: "Gender", value: patient.gender },
                { label: "Address", value: patient.address },
                {
                    label: "Emergency Contact",
                    value: patient.emergencyContact
                      ? `Name: ${patient.emergencyContact.name}, Phone: ${patient.emergencyContact.phone}`
                      : "N/A"
                  },                  
                { label: "Blood Type", value: patient.bloodType },
                { label: "Height", value: patient.height + " cm" },
                { label: "Weight", value: patient.weight + " kg" },
                {
                    label: "Smoking",
                    value: patient.smoking ? "Yes" : "No"
                  },                  
                  { label: "Alcohol Consumption", value: patient.alcoholConsumption ? "Yes" : "No" },
                {
                    label: "Medications",
                    value: Array.isArray(patient.medications) && patient.medications.length > 0
                    ? patient.medications.join(", ")
                    : "N/A"
                },
                { label: "Allergies", value: patient.allergies?.length ? patient.allergies.join(", ") : "N/A" },
                { label: "Pre-existing Conditions", value: patient.preExistingConditions?.length ? patient.preExistingConditions.join(", ") : "N/A" },
                { label: "Past Surgeries", value: patient.pastSurgeries?.length ? patient.pastSurgeries.join(", ") : "N/A" },
                { label: "Chronic Diseases", value: patient.chronicDiseases?.length ? patient.chronicDiseases.join(", ") : "N/A" },
                { label: "Family History", value: patient.familyHistory?.length ? patient.familyHistory.join(", ") : "N/A" },
                {
                    label: "Insurance",
                    value: Object.keys(patient.insurance).length ? JSON.stringify(patient.insurance) : "Not Provided"
                },
                // {
                //     label: "Family History",
                //     value:
                //     typeof patient.familyHistory === "object" && patient.familyHistory !== null
                //         ? JSON.stringify(patient.familyHistory)
                //         : patient.familyHistory
                // },
                { label: "Diet Preference", value: patient.dietPreference },
                { label: "Physical Activity Level", value: patient.physicalActivityLevel },
                { label: "Sleep Patterns", value: patient.sleepPatterns },
                {
                    label: "Emergency Preferences",
                    value: patient.emergencyPreferences && typeof patient.emergencyPreferences === "object"
                    ? `Do Not Resuscitate: ${patient.emergencyPreferences.doNotResuscitate ? "Yes" : "No"}`
                    : "N/A"
                }  
            ].map((item, idx) => (
            <div key={idx}>
                <p className="text-gray-500 font-medium">{item.label}</p>
                <p className="font-semibold break-words">
                {typeof item.value === "object" && item.value !== null ? (
                    <span className="text-gray-400 italic">N/A</span>
                ) : (
                    item.value || <span className="text-gray-400 italic">N/A</span>
                )}
                </p>
            </div>
            ))}
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-8 text-right">
          <button
            className="btn btn-outline btn-primary"
            onClick={() => navigate("/patient/settings")}
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
