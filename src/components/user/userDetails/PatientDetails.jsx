import { useEffect, useState } from "react";
import axios from "axios";

export default function PatientDetails({ userId }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(`/api/patients/${userId}`)
      .then(res => setDetails(res.data))
      .catch(err => console.error("Error fetching patient details:", err));
  }, [userId]);

  if (!details) return <p>Loading Patient Details...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Patient Details</h2>
      <p><strong>Name:</strong> {details.name}</p>
      <p><strong>Email:</strong> {details.email}</p>
      <p><strong>Age:</strong> {details.age}</p>
      <p><strong>Medical History:</strong> {details.medicalHistory}</p>
      {/* Add more fields as needed */}
    </div>
  );
}
