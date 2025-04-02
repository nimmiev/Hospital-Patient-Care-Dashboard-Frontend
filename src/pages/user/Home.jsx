import React from 'react'
import { Link, useNavigate } from "react-router-dom";


const Home = () => {

  const navigate = useNavigate();

  return (
    <>
      <main 
        className="flex-grow flex items-center justify-center min-h-screen relative"
        style={{
          backgroundImage: "url('/images/hospital.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Dark Overlay (Optional for readability) */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Transparent Content Box */}
        <div className="w-full flex flex-col md:flex-row items-center shadow-lg overflow-hidden p-3 max-w-5xl relative z-10 rounded-lg">
          
          {/* Left Side: Content */}
          <div className="w-full md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-white">Hospital Patient Care Dashboard</h1>
            <p className="mt-4 text-gray-200">
              A seamless way to manage patient records, appointments, and hospital operations efficiently.
              Admins can update this section dynamically to display real-time hospital announcements and important details.
            </p>
            <p className="mt-2 text-gray-200">
              Stay updated with patient history, doctor availability, and emergency alerts all in one place.
            </p>
            
            <button 
              className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            ><Link to="/contact" >
              Contact us
              </Link>
            </button>
          </div>

          {/* Right Side (Optional: Can add UI elements here) */}
          <div className="w-full md:w-1/2 h-64 md:h-auto flex items-center justify-center"></div>

        </div>
      </main>
    </>
  )
}

export default Home
