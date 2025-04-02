import React from 'react';
import Header from '../components/user/header';
import Footer from '../components/user/footer';
import { Outlet } from 'react-router-dom';


const RootLayout = () => {
  return (
    <div>
      <Header />
        <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
