import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPatients = () => {

  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletePatientId, setDeletePatientId] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);


  const fetchPatients = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/patient");
      console.log("Patient Data:", response.data.data);
      setPatients(response.data.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleDelete = async (id) => {
    // if (window.confirm("Are you sure you want to delete this patient?")) {
    //   try {
    //     await axiosInstance.delete(`/api/admin/patient/${id}`);
    //     // alert("Patient deleted successfully!");
    //     toast.success("Patient deleted successfully!")
    //     fetchPatients(); // Refresh the list
    //   } catch (error) {
    //     toast.error("Error deleting patient!");
    //     console.error("Error deleting patient:", error);
    //   }
    // }
    if (!deletePatientId) return;
    try {
      await axiosInstance.delete(`/api/admin/patient/${deletePatientId}`);
      toast.success("Patient deleted successfully!");
      fetchPatients();
    } catch (error) {
      toast.error("Error deleting patient!");
      console.error("Error deleting patient:", error);
    } finally {
      setDeletePatientId(null); // Close modal
    }
  };

  const handleAddAppointment = async (id) => {
    try {
      const response = await axiosInstance.post("/api/admin/appointment", { patientId: id });
      // alert("Appointment added successfully!");
      toast.success("Appointment added successfully!");
      console.log("Appointment Data:", response.data);
    } catch (error) {
      toast.error("Error adding appointment!");
      console.error("Error adding appointment:", error);
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
        <h2 className="text-2xl font-semibold text-primary">Patient Management List</h2>
        <button className="btn btn-primary" onClick={() => navigate("/admin/patient/add-patient")}>
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
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {paginatedData.map((patient, index) => (
              <tr key={patient._id} className="hover:bg-base-200 transition duration-200">
                <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="p-3">{patient.name}</td>
                <td className="p-3">{patient.email}</td>
                <td className="p-3">{patient.phone}</td>
                <td className="p-3 flex space-x-2">
                  <button className="btn btn-sm btn-info" onClick={() => navigate(`/admin/patient/${patient._id}`)}>View</button>
                  {/* <button className="btn btn-sm btn-accent" onClick={() => handleApprove(patient._id)}>Approve</button> */}
                  <button className="btn btn-sm btn-error" onClick={() => setDeletePatientId(patient._id)}>Delete</button>
                  <button className="btn btn-sm btn-success" onClick={() => handleAddAppointment(patient._id)}>Add Appointment</button>
                </td>
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

      {/* Delete Confirmation Modal */}
      {deletePatientId && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this patient?</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn" onClick={() => setDeletePatientId(null)}>Cancel</button>
            </div>
          </div>
          {/* Click outside to close */}
          <div className="modal-backdrop" onClick={() => setDeletePatientId(null)}></div>
        </div>
      )}

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default AdminPatients;


