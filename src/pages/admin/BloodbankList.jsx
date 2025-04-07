import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BloodbankList = () => {

  const [bloodbanks, setBloodbanks] = useState([]);
  const [deleteBloodbankId, setDeleteBloodbankId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBloodbanks();
  }, []);

  const fetchBloodbanks = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/bloodbank");
      // console.log("Bloodbanks Data:", response.data.data);
      setBloodbanks(response.data.data);
    } catch (error) {
      console.error("Error fetching Bloodbank:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!deleteBloodbankId) return;
    try {
      await axiosInstance.delete(`/api/admin/delete-bloodbank/${deleteBloodbankId}`);
      toast.success("Bloodbank details deleted successfully!");
      fetchBloodbanks();
    } catch (error) {
      toast.error("Error deleting bloodbank!");
      console.error("Error deleting bloodbank:", error);
    } finally {
      setDeleteBloodbankId(null); // Close modal
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchBloodbanks();
      return;
    }

    try {
      const response = await axiosInstance.get(`/api/admin/search-bloodbank?bloodGroup=${searchQuery}`);
      setBloodbanks(response.data.data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching bloodbanks:", error);
      toast.error("Error searching bloodbanks");
    }
  };


  // Pagination logic
  const totalPages = Math.ceil(bloodbanks.length / itemsPerPage);
  const paginatedData = bloodbanks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">

        {/* Back navigating button */}
        <button type="radio" onClick={() => navigate(-1)} name="my_tabs_6" className="btn btn-secondary mb-4" >← Back</button>

        <h2 className="text-2xl font-semibold mb-4 text-center text-primary">Bloodbank List</h2>

        <div className="flex gap-2 w-full md:w-auto">
          {/* Search Input */}
          <input
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} placeholder="Search by Blood Group" className="input input-bordered w-full md:w-48" />
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>

          {/* Add Button */}
          <button className="btn btn-accent" onClick={() => navigate("/admin/bloodbank/add-bloodbank")}>
            + Add Bloodbank
          </button>
        </div>
      </div>

      {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
      <div className="overflow-x-auto rounded-lg border border-base-content/10 bg-base-100 shadow-lg">
        <table className="table w-full">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">BloodGroup</th>
              <th className="p-3">quantity</th>
              <th className="p-3">Hospital Name</th>
              <th className="p-3">Contact Number</th>
              <th className="p-3">Location</th>
              <th className="p-3">Available</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          {/* <tbody className="divide-y divide-base-300">
            {paginatedData.map((bloodbank, index) => (
              <tr
                key={bloodbank._id}
                className="hover:bg-base-200 transition duration-200"
              >
                <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                
                <td className="p-3">{bloodbank.bloodGroup}</td>
                <td className="p-3">{bloodbank.quantity}</td>
                <td className="p-3">{bloodbank.hospitalName}</td>
                <td className="p-3">{bloodbank.contactNumber}</td>
                <td className="p-3">{bloodbank.location}</td>
                <td className="p-3">{bloodbank.available}</td>
                <td className="p-3 flex space-x-2">
                  <button className="btn btn-sm btn-warning" onClick={() => navigate(`/admin/bloodbank/${bloodbank._id}`)}>Update</button>
                  <button className="btn btn-sm btn-error" onClick={() => setDeleteBloodbankId(bloodbank._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody> */}
          <tbody className="divide-y divide-base-300">
            {paginatedData.length > 0 ? (
              paginatedData.map((bloodbank, index) => (
                <tr
                  key={bloodbank._id}
                  className="hover:bg-base-200 transition duration-200"
                >
                  <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="p-3">{bloodbank.bloodGroup}</td>
                  <td className="p-3">{bloodbank.quantity}</td>
                  <td className="p-3">{bloodbank.hospitalName}</td>
                  <td className="p-3">{bloodbank.contactNumber}</td>
                  <td className="p-3">{bloodbank.location}</td>
                  <td className="p-3">{bloodbank.available ? "Yes" : "No"}</td>
                  <td className="p-3 flex space-x-2">
                    <button className="btn btn-sm btn-warning" onClick={() => navigate(`/admin/bloodbank/${bloodbank._id}`)}>Update</button>
                    <button className="btn btn-sm btn-error" onClick={() => setDeleteBloodbankId(bloodbank._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">No bloodbanks found</td>
              </tr>
            )}
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
      {deleteBloodbankId && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this bloodbank?</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn" onClick={() => setDeleteBloodbankId(null)}>Cancel</button>
            </div>
          </div>
          {/* Click outside to close */}
          <div className="modal-backdrop" onClick={() => setDeleteBloodbankId(null)}></div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default BloodbankList;

