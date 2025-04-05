import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const PatientDetails = () => {
  const { id } = useParams(); // Get patient ID from URL
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/admin/patient/${id}`);
        console.log(response.data.data);
        setPatient(response.data.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatientDetails();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!patient) {
    return <div className="flex justify-center items-center h-screen text-red-500">Patient not found!</div>;
  }

  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-4">← Back</button>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Profile Section */}
        <div className="text-center">
          <img 
            src={patient.profilepic} 
            onError={(e) => { e.target.onerror = null; e.target.src = "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1742623449~exp=1742627049~hmac=3bb4b47fbe4a2fe8f6a3b06ae7708f672a14c262d9290750d8205209a9252ed9&w=740"; }} 
            alt="Patient Profile"
            className="w-24 h-24 rounded-full mx-auto mb-3"
          />
          <h2 className="text-2xl font-bold">{patient.name}</h2>
          <p className="text-gray-500">{patient.email}</p>
          <p className="text-gray-500">{patient.phone}</p>
        </div>

        <div className="divider"></div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Information */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-primary">Personal Information</h3>
            <p><strong>DOB:</strong> {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Address:</strong> {patient.address}</p>
          </div>

          {/* Medical History */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-primary">Medical History</h3>
            <p><strong>Blood Type:</strong> {patient.bloodType}</p>
            <p><strong>Height:</strong> {patient.height} cm</p>
            <p><strong>Weight:</strong> {patient.weight} kg</p>
            <p><strong>Chronic Diseases:</strong> {patient.chronicDiseases?.join(", ") || "None"}</p>
            <p><strong>Pre-existing Conditions:</strong> {patient.preExistingConditions?.join(", ") || "None"}</p>
            <p><strong>Allergies:</strong> {patient.allergies?.join(", ") || "None"}</p>
            <p><strong>Past Surgeries:</strong> {patient.pastSurgeries?.join(", ") || "None"}</p>
            <p><strong>Medications:</strong> {patient.medications?.join(", ") || "None"}</p>
          </div>

          {/* Lifestyle */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-primary">Lifestyle</h3>
            <p><strong>Smoking:</strong> {patient.smoking ? "Yes" : "No"}</p>
            <p><strong>Alcohol Consumption:</strong> {patient.alcoholConsumption ? "Yes" : "No"}</p>
            <p><strong>Diet Preference:</strong> {patient.dietPreference}</p>
            <p><strong>Physical Activity Level:</strong> {patient.physicalActivityLevel}</p>
            <p><strong>Sleep Patterns:</strong> {patient.sleepPatterns}</p>
          </div>

          {/* Emergency Information */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-primary">Emergency Information</h3>
            <p><strong>Emergency Contact:</strong> {patient.emergencyContact?.name} ({patient.emergencyContact?.phone})</p>
            <p><strong>Preferred Hospital:</strong> {patient.emergencyPreferences?.preferredHospital}</p>
            <p><strong>Primary Care Physician:</strong> {patient.emergencyPreferences?.primaryCarePhysician}</p>
            <p><strong>Do Not Resuscitate:</strong> {patient.emergencyPreferences?.doNotResuscitate ? "Yes" : "No"}</p>
          </div>

          {/* Insurance */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-primary">Insurance</h3>
            <p><strong>Provider:</strong> {patient.insurance?.provider}</p>
            <p><strong>Policy Number:</strong> {patient.insurance?.policyNumber}</p>
            <p><strong>Expiration Date:</strong> {new Date(patient.insurance?.expirationDate).toLocaleDateString()}</p>
          </div>

          {/* Family History */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-primary">Family History</h3>
            {patient.familyHistory?.length > 0 ? (
              <ul className="list-disc list-inside">
                {patient.familyHistory.map((history, index) => (
                  <li key={index}>{history.condition} - {history.relative}</li>
                ))}
              </ul>
            ) : (
              <p>None</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;