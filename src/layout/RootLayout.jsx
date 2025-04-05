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

  return (
    <div>

      {isDashboardUser ? <DashbordHeader /> : <Header />}

        <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
