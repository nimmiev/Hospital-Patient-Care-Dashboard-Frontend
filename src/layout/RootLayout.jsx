import React from 'react';
import Header from '../components/user/header';
import DashbordHeader from '../components/user/DashbordHeader';
import Footer from '../components/user/footer';
import { Outlet, useLocation } from 'react-router-dom';

const RootLayout = () => {
  const location = useLocation();
  const role = localStorage.getItem("role");

  const dashboardRoles = ["Staff", "Patient", "Doctor"];
  const isDashboardUser = dashboardRoles.includes(role);

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      {/* Show DashbordHeader only if user is a dashboard user and not on login/signup */}
      {isDashboardUser && !isAuthPage ? <DashbordHeader /> : <Header />}
      
      <Outlet />
      
      <Footer />
    </div>
  );
};

export default RootLayout;
