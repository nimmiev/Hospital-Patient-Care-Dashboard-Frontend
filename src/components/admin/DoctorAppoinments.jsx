// const DoctorAppoinments = () => {
//   return (
//     <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
//         <table className="table">
//             {/* head */}
//             <thead>
//             <tr>
//                 <th></th>
//                 <th>Name</th>
//                 <th>Job</th>
//                 <th>Favorite Color</th>
//             </tr>
//             </thead>
//             <tbody>
//             {/* row 1 */}
//             <tr>
//                 <th>1</th>
//                 <td>Cy Ganderton</td>
//                 <td>Quality Control Specialist</td>
//                 <td>Blue</td>
//             </tr>
//             {/* row 2 */}
//             <tr>
//                 <th>2</th>
//                 <td>Hart Hagerty</td>
//                 <td>Desktop Support Technician</td>
//                 <td>Purple</td>
//             </tr>
//             {/* row 3 */}
//             <tr>
//                 <th>3</th>
//                 <td>Brice Swyre</td>
//                 <td>Tax Accountant</td>
//                 <td>Red</td>
//             </tr>
//             </tbody>
//         </table>
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch today's appointments from your backend
    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get('/api/admin/appoinment/today');
        setAppointments(res.data.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <div className="max-h-[240px] overflow-y-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.patientName}</td>
                  <td>{item.doctorName}</td>
                  <td>{item.appointmentDate}</td>
                  <td>{item.appointmentTime}</td>
                  <td>{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointments;
