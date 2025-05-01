import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BloodbankList = () => {
  const [bloodbanks, setBloodbanks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBloodbanks();
  }, []);

  const fetchBloodbanks = async () => {
    try {
      const response = await axiosInstance.get("/api/patient/bloodbank");
      setBloodbanks(response.data.data);
    } catch (error) {
      console.error("Error fetching Bloodbank:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchBloodbanks();
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/api/patient/search-bloodbank?bloodgroup=${searchQuery}`
      );
      setBloodbanks(response.data.data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching bloodbanks:", error);
      toast.error("Error searching bloodbanks");
    }
  };

  // Pagination
  const totalPages = Math.ceil(bloodbanks.length / itemsPerPage);
  const paginatedData = bloodbanks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-secondary mb-2 md:mb-0"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-semibold text-primary text-center w-full mb-2 md:mb-0">
          Bloodbank List
        </h2>
        <div className="flex gap-2 w-full md:w-auto justify-end">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search by Blood Group"
            className="input input-bordered w-full md:w-48"
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-base-content/10 bg-base-100 shadow-lg">
        <table className="table w-full min-w-full">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Blood Group</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Hospital Name</th>
              <th className="p-3">Contact Number</th>
              <th className="p-3">Location</th>
              <th className="p-3">Available</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {paginatedData.length > 0 ? (
              paginatedData.map((bloodbank, index) => (
                <tr key={bloodbank._id} className="hover:bg-base-200 transition">
                  <td className="p-3">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="p-3">{bloodbank.bloodGroup}</td>
                  <td className="p-3">{bloodbank.quantity}</td>
                  <td className="p-3">{bloodbank.hospitalName}</td>
                  <td className="p-3">{bloodbank.contactNumber}</td>
                  <td className="p-3">{bloodbank.location}</td>
                  <td className="p-3">{bloodbank.available ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No bloodbanks found
                </td>
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
              key={index}
              className={`join-item btn ${currentPage === index + 1 ? "btn-primary" : ""
                }`}
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

      <ToastContainer />
    </div>


  );
};

export default BloodbankList;
