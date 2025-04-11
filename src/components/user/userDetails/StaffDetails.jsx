import { useEffect, useState } from "react";
import axios from "axios";

export default function StaffDetails({ userId }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(`/api/staff/${userId}`)
      .then(res => setDetails(res.data))
      .catch(err => console.error("Error fetching staff details:", err));
  }, [userId]);

  if (!details) return <p>Loading Staff Details...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Staff Details</h2>
      <p><strong>Name:</strong> {details.name}</p>
      <p><strong>Email:</strong> {details.email}</p>
      <p><strong>Department:</strong> {details.department}</p>
      {/* Add more fields as needed */}
    </div>
  );
}
