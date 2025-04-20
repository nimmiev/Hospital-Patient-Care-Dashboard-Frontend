import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPatients = () => {

  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletePatientId, setDeletePatientId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);


  const fetchPatients = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/patient");
      // console.log("Patient Data:", response.data.data);
      setPatients(response.data.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleDelete = async (id) => {
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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchPatients(); // Reset to full list
      return;
    }

    try {
      const response = await axiosInstance.get(`/api/admin/searchPatient?name=${searchQuery}`);
      const result = response.data.data;
      // console.log(result)
      if (result.length === 0) {
        toast.info("No patient found. Showing all patients.");
        fetchPatients(); // fallback to full list
      } else {
        setPatients(result);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error searching doctor:", error);
      toast.error("Something went wrong!");
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

        <h2 className="text-2xl font-semibold text-primary">Patient Management List</h2>

        <div>
          {/* Search Input */}
          <input
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} placeholder="Search by Patient Name" className="input input-bordered w-full md:w-48" />
          <button className="btn btn-primary ml-2" onClick={handleSearch} >Search</button>

          <button className="btn btn-primary ml-2" onClick={() => navigate("/admin/patient/add-patient")}>
            + Add Patient
          </button>
        </div>

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
                  <button className="btn btn-sm btn-error" onClick={() => setDeletePatientId(patient._id)}>Delete</button>
                  <button className="btn btn-sm btn-success" onClick={() => navigate(`/admin/schedule/${patient._id}`)}>Add Appointment</button>
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


