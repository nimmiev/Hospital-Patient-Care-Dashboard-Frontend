import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Messages = () => {

  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/message");
      console.log("Messages:", response);
      setMessages(response.data.data);
    } catch (error) {
      console.error("Error fetching Messages:", error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(messages.length / itemsPerPage);
  const paginatedData = messages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">

        {/* Back navigating button */}
        <button type="radio" onClick={() => navigate(-1)} name="my_tabs_6" className="btn btn-secondary mb-4" >← Back</button>

        <h2 className="text-2xl font-semibold mb-4 text-center text-primary">User Messages</h2>

        <div className="flex gap-2 w-full md:w-auto">
          {/* Search Input */}
          {/* <input
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} placeholder="Search by Blood Group" className="input input-bordered w-full md:w-48" />
          <button className="btn btn-primary" onClick={handleSearch}>Search</button> */}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-base-content/10 bg-base-100 shadow-lg">
        <table className="table w-full">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {paginatedData.length > 0 ? (
              paginatedData.map((message, index) => (
                <tr
                  key={message._id}
                  className="hover:bg-base-200 transition duration-200"
                >
                  <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="p-3">{message.name}</td>
                  <td className="p-3">{message.email}</td>
                  <td className="p-3">{message.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">No messages found</td>
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

      <ToastContainer />
    </div>
  );
};

export default Messages;

