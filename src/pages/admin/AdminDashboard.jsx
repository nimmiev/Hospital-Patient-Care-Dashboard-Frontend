import React from 'react';
import StatsDashboard from "../../components/admin/StatsDashboard.jsx";
import List from "../../components/admin/List.jsx";
import DoctorAppoinments from '../../components/admin/DoctorAppoinments.jsx';
import BloodbankList from '../../components/admin/BloodbankList.jsx';
import PatientProgressChart from '../../components/admin/PatientProgressChart.jsx';

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Section */}
      <StatsDashboard />
        <div className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-content/10">
          <h2 className="text-lg font-semibold mb-4">Today Appointments</h2>
          <DoctorAppoinments />
        </div>
    </div>
  );
};

export default AdminDashboard;
