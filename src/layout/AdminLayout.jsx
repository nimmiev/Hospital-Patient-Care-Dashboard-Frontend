// import React, { useState } from 'react';
// import Header from '../components/admin/header';
// import Footer from '../components/admin/footer';
// import Sidebar from '../components/admin/sidebar';
// import { Outlet } from 'react-router-dom';

// const AdminLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

//       {/* Main Content */}
//       <div
//   className={`flex flex-col flex-1 transition-all duration-300 ${
//     isSidebarOpen ? 'ml-72 sm:ml-64 lg:ml-72' : 'ml-0'
//   } w-full min-h-screen overflow-hidden`}
// >

//         <Header setIsOpen={setIsSidebarOpen} />
        
        
//         {/* Content Section - Full Height Adjustment */}
//         <div className="flex-1 overflow-auto p-4">
//           <Outlet />
//         </div>
        
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import React, { useState } from "react";
import Header from "../components/admin/header";
import Footer from "../components/admin/footer";
import Sidebar from "../components/admin/sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Overlay to close sidebar on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content - Adjust margin for large screens */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "hidden sm:block sm:ml-64 lg:ml-72" : "ml-0"
        } w-full min-h-screen overflow-hidden`}
      >
        <Header setIsOpen={setIsSidebarOpen} />

        {/* Content Section */}
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
