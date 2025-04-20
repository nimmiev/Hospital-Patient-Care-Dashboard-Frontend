import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientList = () => {

  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);


  const fetchPatients = async () => {
    try {
      const response = await axiosInstance.get("/api/staff/patient");
      // console.log("Patient Data:", response.data.data);
      setPatients(response.data.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Pagination logic
  
  
  const totalPages = Math.ceil(patients.length / itemsPerPage);
  const paginatedData = patients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        {/* Back navigating button */}
        <button type="radio" onClick={() => navigate(-1)} name="my_tabs_6" className="btn btn-secondary mb-4" >← Back</button>
                
        <h2 className="text-2xl font-semibold text-primary">Patients List</h2>
        
        <button className="btn btn-primary" onClick={() => navigate("/staff/addPatient")}>
          + Add Patient
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-base-content/10 bg-base-100 shadow-lg">
        <table className="table w-full">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {paginatedData.map((patient, index) => (
              <tr key={(currentPage - 1) * itemsPerPage + index} className="hover:bg-base-200 transition duration-200">
                <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="p-3">{patient.name}</td>
                <td className="p-3">{patient.email}</td>
                <td className="p-3">{patient.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <div className="join">
          <button
            className="join-item btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            «
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`join-item btn ${currentPage === index + 1 ? "btn-primary" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="join-item btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            »
          </button>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default PatientList;


