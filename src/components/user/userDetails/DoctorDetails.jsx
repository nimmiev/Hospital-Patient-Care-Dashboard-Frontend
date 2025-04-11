import { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorDetails({ userId }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(`/api/doctors/${userId}`)
      .then(res => setDetails(res.data))
      .catch(err => console.error("Error fetching doctor details:", err));
  }, [userId]);

  if (!details) return <p>Loading Doctor Details...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Doctor Details</h2>
      <p><strong>Name:</strong> {details.name}</p>
      <p><strong>Specialization:</strong> {details.specialization}</p>
      <p><strong>Email:</strong> {details.email}</p>
      <p><strong>Experience:</strong> {details.experience} years</p>
      {/* Add more fields as needed */}
    </div>
  );
}
