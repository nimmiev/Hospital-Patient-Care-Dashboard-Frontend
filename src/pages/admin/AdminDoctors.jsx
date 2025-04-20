import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDoctors = () => {

  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDoctorId, setDeleteDoctorId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const navigate = useNavigate();
  // search
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/doctors");
      // console.log("Doctors Data:", response.data.data);
      setDoctors(response.data.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await axiosInstance.put(`/api/admin/doctorApproval/${id}`);
      toast.success("Doctor approved successfully!");
      fetchDoctors(); // Refresh the data
    } catch (error) {
      toast.error("Error approving doctor!");
      console.error("Error approving doctor:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axiosInstance.put(`/api/admin/doctorReject/${id}`);
      toast.success("Doctor rejected successfully!");
      fetchDoctors(); // Refresh the data
    } catch (error) {
      toast.error("Error rejecting doctor!");
      console.error("Error rejecting doctor:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!deleteDoctorId) return;
    try {
      await axiosInstance.delete(`/api/admin/doctor/${deleteDoctorId}`);
      toast.success("Doctor deleted successfully!");
      fetchDoctors();
    } catch (error) {
      toast.error("Error deleting doctor!");
      console.error("Error deleting doctor:", error);
    } finally {
      setDeleteDoctorId(null); // Close modal
    }
  };

  // const handleSearch = async () => {
  //   if (!searchQuery.trim()) {
  //     fetchDoctors();
  //     return;
  //   }

  //   try {
  //     const response = await axiosInstance.get(`/api/staff/searchDoctor?name=${searchQuery}`);
  //     console.log(response)
  //     setDoctors(response.data.data);
  //     setCurrentPage(1);
  //   } catch (error) {
  //     console.error("Error searching doctor:", error);
  //     toast.error("Doctor not found");
  //   }
  // };

  // Pagination logic
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchDoctors(); // Reset to full list
      return;
    }
  
    try {
      const response = await axiosInstance.get(`/api/admin/searchDoctor?name=${searchQuery}`);
      const result = response.data.data;
  // console.log(result)
      if (result.length === 0) {
        toast.info("No doctors found. Showing all doctors.");
        fetchDoctors(); // fallback to full list
      } else {
        setDoctors(result);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error searching doctor:", error);
      toast.error("Something went wrong!");
    }
  };
  
  const totalPages = Math.ceil(doctors.length / itemsPerPage);
  const paginatedData = doctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        {/* Back navigating button */}
        <button type="radio" onClick={() => navigate(-1)} name="my_tabs_6" className="btn btn-secondary mb-4" >← Back</button>

        <h2 className="text-2xl font-semibold mb-4 text-center text-primary">Doctors Management List</h2>

        <div>
          {/* Search Input */}
          <input
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} placeholder="Search by Doctor Name" className="input input-bordered w-full md:w-48" />
          <button className="btn btn-primary ml-2" onClick={handleSearch} >Search</button>

        </div>

        {/* <button className="btn btn-primary" onClick={() => navigate("/admin/doctor/add-doctor")}>
            + Add Doctor
        </button> */}
      </div>
      {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
      <div className="overflow-x-auto rounded-lg border border-base-content/10 bg-base-100 shadow-lg">
        <table className="table w-full">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {paginatedData.map((doctor, index) => (
              <tr
                key={doctor._id}
                className="hover:bg-base-200 transition duration-200"
              >
                <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="p-3">{doctor.name}</td>
                <td className="p-3">{doctor.email}</td>
                <td className="p-3">{doctor.phone}</td>
                <td className={`p-3 ${doctor.approved === true ? 'text-green-600' : doctor.approved === false ? 'text-red-500' : 'text-yellow-500'}`}> {
                  doctor.approved === true ? "Accepted" :
                    doctor.approved === false ? "Rejected" : "Requested"}
                </td>
                {/* <td className="p-3 flex space-x-2">
                  <button className="btn btn-sm btn-info" onClick={() => navigate(`/admin/doctor/${doctor._id}`)}>View</button>                  
                  <button className="btn btn-sm btn-success" onClick={() => handleApprove(doctor._id)}>Approve</button>                  
                  <button className="btn btn-sm btn-warning" onClick={() => handleReject(doctor._id)}>Reject</button>                  
                  <button className="btn btn-sm btn-error" onClick={() => setDeleteDoctorId(doctor._id)}>Delete</button>
                </td> */}
                <td className="p-3 flex space-x-2">
                  <button className="btn btn-sm btn-info" onClick={() => navigate(`/admin/doctor/${doctor._id}`)}>View</button>

                  {/* Approve button - show if not already approved */}
                  {(doctor.approved === false || doctor.approved === null || doctor.approved === undefined) && (
                    <button className="btn btn-sm btn-success" onClick={() => handleApprove(doctor._id)}>Approve</button>
                  )}

                  {/* Reject button - show if not already rejected */}
                  {(doctor.approved === true || doctor.approved === null || doctor.approved === undefined) && (
                    <button className="btn btn-sm btn-warning" onClick={() => handleReject(doctor._id)}>Reject</button>
                  )}

                  <button className="btn btn-sm btn-error" onClick={() => setDeleteDoctorId(doctor._id)}>Delete</button>
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
      {deleteDoctorId && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this doctor?</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn" onClick={() => setDeleteDoctorId(null)}>Cancel</button>
            </div>
          </div>
          {/* Click outside to close */}
          <div className="modal-backdrop" onClick={() => setDeleteDoctorId(null)}></div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminDoctors;

