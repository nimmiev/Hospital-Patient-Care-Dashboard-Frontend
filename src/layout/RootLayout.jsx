import React from 'react';
import Header from '../components/user/header';
import DashbordHeader from '../components/user/DashbordHeader';
import Footer from '../components/user/footer';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/user/Sidebar';

const RootLayout = () => {
  const location = useLocation();
  const role = localStorage.getItem("role");

  const dashboardRoles = ["Staff", "Patient", "Doctor"];
  const isDashboardUser = dashboardRoles.includes(role);

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  // Show Sidebar only for exact dashboard paths
  // const showSidebar = ["/patient", "/staff", "/doctor", "/patient/profile", "/patient/settings",
  //   "/patient/appoinments", "/patient/bloodbanks", "/doctor/profile", "/doctor/settings", "/doctor/appoinments", "/doctor/patients"].includes(location.pathname);

  const showSidebar = ["/patient", "/doctor", "/staff"].some(path =>
    location.pathname.startsWith(path)
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {isDashboardUser && !isAuthPage ? <DashbordHeader /> : <Header />}

      {/* Main content area with sidebar and content */}
      <div className="flex flex-1">
        {showSidebar && (
          <div className="w-64 bg-gray-100">
            <Sidebar />
          </div>
        )}

        {/* Main outlet area */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;
