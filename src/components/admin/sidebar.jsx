import React from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-base-200 shadow-lg transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0 w-full sm:w-64 lg:w-72" : "-translate-x-full w-72"}
      `}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold"><Link to="/admin">HEALTHCARE</Link></h2>
        <X className="h-6 w-6 cursor-pointer" onClick={() => setIsOpen(false)} />
      </div>

      <ul className="menu p-4">
        <li>
          <Link to="/admin/patients" className="hover:bg-primary hover:text-white">Patiens Management</Link>
        </li>
        <li>
          <Link to="/admin/doctors" className="hover:bg-primary hover:text-white">Doctors Management</Link>
        </li>
        <li>
          <Link to="/admin/staff" className="hover:bg-primary hover:text-white">Staff Management</Link>
        </li>
        <li>
          <Link to="/admin/appoinments" className="hover:bg-primary hover:text-white">Appoinments Management</Link>
        </li>
        <li>
          <Link to="/admin/bloodbank" className="hover:bg-primary hover:text-white">BloodBank Management</Link>
        </li>
        <li>
          <Link to="/admin/task" className="hover:bg-primary hover:text-white">Staff - Task Management</Link>
        </li>
        <li>
          <Link to="/admin/instruction" className="hover:bg-primary hover:text-white">General Instructions</Link>
        </li>
        <li>
          <Link to="/admin/messages" className="hover:bg-primary hover:text-white">User Messages</Link>
        </li>
        {/* <li>
          <Link to="/admin/privacy" className="hover:bg-primary hover:text-white">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/admin/terms" className="hover:bg-primary hover:text-white">Documentations</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
