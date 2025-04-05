import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PatientForm from "../../components/forms/PatientForm";
import StaffForm from "../../components/forms/StaffForm";
import DoctorForm from "../../components/forms/DoctorsForm"; 
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles

const Signup = () => {

    const [activeTab, setActiveTab] = useState("patient");

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex w-[80%] max-w-4xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:flex items-center">
          <img
            src="/images/signup.jpg"
            alt="Signup Illustration"
            className="w-full object-cover"
          />
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
          <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>

          {/* Tabs */}
          <div className="flex justify-between border-b pb-2 mb-4">
            {["patient", "staff", "doctor"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 ${
                  activeTab === tab ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Render Forms Based on Active Tab */}
          {activeTab === "patient" && <PatientForm />}
          {activeTab === "staff" && <StaffForm />}
          {activeTab === "doctor" && <DoctorForm />}

          <p className="text-center mt-4">
            Already have an account?
            <Link to="/login" className="text-blue-500 ml-1">Login</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
)
}

export default Signup
