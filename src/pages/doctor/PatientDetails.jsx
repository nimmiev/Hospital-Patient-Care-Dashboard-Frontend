import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const PatientDetails = () => {
  const { id: publicId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/doctor/patient/${publicId}`);
        setPatient(response.data.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatientDetails();
  }, [publicId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-base-content">Loading...</div>;
  }

  if (!patient) {
    return <div className="flex justify-center items-center h-screen text-error">Patient not found!</div>;
  }

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-4">← Back</button>

      <div className="max-w-4xl mx-auto card bg-base-100 shadow-xl p-6">
        <div className="text-center">
          <img
            src={patient.profilepic}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?w=740";
            }}
            alt="Patient Profile"
            className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
          />
          <h2 className="text-2xl font-bold text-base-content">{patient.name}</h2>
          <p className="text-base-content opacity-70">{patient.email}</p>
          <p className="text-base-content opacity-70">{patient.phone}</p>
        </div>

        <div className="divider my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[{
              title: "Personal Information",
              fields: [
                ["DOB", new Date(patient.dateOfBirth).toLocaleDateString()],
                ["Gender", patient.gender],
                ["Address", patient.address],
              ],
            },
            {
              title: "Medical History",
              fields: [
                ["Blood Type", patient.bloodType],
                ["Height", `${patient.height} cm`],
                ["Weight", `${patient.weight} kg`],
                ["Chronic Diseases", patient.chronicDiseases?.join(", ") || "None"],
                ["Pre-existing Conditions", patient.preExistingConditions?.join(", ") || "None"],
                ["Allergies", patient.allergies?.join(", ") || "None"],
                ["Past Surgeries", patient.pastSurgeries?.join(", ") || "None"],
                ["Medications", patient.medications?.join(", ") || "None"],
              ],
            },
            {
              title: "Lifestyle",
              fields: [
                ["Smoking", patient.smoking ? "Yes" : "No"],
                ["Alcohol Consumption", patient.alcoholConsumption ? "Yes" : "No"],
                ["Diet Preference", patient.dietPreference],
                ["Physical Activity Level", patient.physicalActivityLevel],
                ["Sleep Patterns", patient.sleepPatterns],
              ],
            },
            {
              title: "Emergency Information",
              fields: [
                ["Emergency Contact", `${patient.emergencyContact?.name} (${patient.emergencyContact?.phone})`],
                ["Preferred Hospital", patient.emergencyPreferences?.preferredHospital],
                ["Primary Care Physician", patient.emergencyPreferences?.primaryCarePhysician],
                ["Do Not Resuscitate", patient.emergencyPreferences?.doNotResuscitate ? "Yes" : "No"],
              ],
            },
            {
              title: "Insurance",
              fields: [
                ["Provider", patient.insurance?.provider],
                ["Policy Number", patient.insurance?.policyNumber],
                ["Expiration Date", new Date(patient.insurance?.expirationDate).toLocaleDateString()],
              ],
            },
          ].map((section, idx) => (
            <div key={idx} className="card bg-base-100 border border-base-300 p-4">
              <h3 className="text-lg font-semibold text-primary mb-2">{section.title}</h3>
              {section.fields.map(([label, value], i) => (
                <p key={i} className="text-base-content">
                  <strong>{label}:</strong> {value}
                </p>
              ))}
            </div>
          ))}

          {/* Family History */}
          <div className="card bg-base-100 border border-base-300 p-4">
            <h3 className="text-lg font-semibold text-primary mb-2">Family History</h3>
            {patient.familyHistory?.length > 0 ? (
              <ul className="list-disc list-inside text-base-content">
                {patient.familyHistory.map((history, index) => (
                  <li key={index}>
                    {history.condition} - {history.relative}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-base-content">None</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;


