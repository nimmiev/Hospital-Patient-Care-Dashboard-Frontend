import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const StaffTaskList = () => {

  const [tasks, setTasks] = useState([]);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/task");
      // console.log("Tasks Data:", response.data.data);
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching Task:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!deleteTaskId) return;
    try {
      await axiosInstance.delete(`/api/admin/delete-task/${deleteTaskId}`);
      toast.success("Staff Task details deleted successfully!");
      fetchTasks();
    } catch (error) {
      toast.error("Error deleting task!");
      console.error("Error deleting task:", error);
    } finally {
      setDeleteTaskId(null); // Close modal
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchTasks();
      return;
    }

    try {
      const response = await axiosInstance.get(`/api/admin/search-task?date=${searchQuery}`);
      setTasks(response.data.data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching tasks:", error);
      toast.error("Error searching tasks");
    }
  };


  // Pagination logic
  const totalPages = Math.ceil(tasks.length / itemsPerPage);
  const paginatedData = tasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">

        {/* Back navigating button */}
        <button type="radio" onClick={() => navigate(-1)} name="my_tabs_6" className="btn btn-secondary mb-4" >← Back</button>

        <h2 className="text-2xl font-semibold mb-4 text-center text-primary">Service Staff - Tasks List</h2>

        <div className="flex gap-2 w-full md:w-auto">
          {/* Search Input */}
          <input
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} placeholder="Search by Date ( Y-M-D )" className="input input-bordered w-full md:w-48" />
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
      <div className="overflow-x-auto rounded-lg border border-base-content/10 bg-base-100 shadow-lg">
        <table className="table w-full">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Staff Name</th>
              <th className="p-3">Staff Email</th>
              <th className="p-3">Task</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {paginatedData.length > 0 ? (
              paginatedData.map((task, index) => (
                <tr
                  key={task._id}
                  className="hover:bg-base-200 transition duration-200"
                >
                  <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="p-3">{task.staffDetails.name}</td>
                  <td className="p-3">{task.staffDetails.email}</td>
                  <td className="p-3">{task.taskDescription}</td>
                  <td className="p-3">{moment(task.createdAt).format("YYYY-MM-DD HH:mm")}</td>
                  <td className="p-3">{task.status}</td>
                  <td className="p-3 flex space-x-2">
                    <button className="btn btn-sm btn-warning" onClick={() => navigate(`/admin/editTask/${task._id}`)}>Update</button>
                    <button className="btn btn-sm btn-error" onClick={() => setDeleteTaskId(task._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">No tasks found</td>
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
      {deleteTaskId && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this Task?</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn" onClick={() => setDeleteTaskId(null)}>Cancel</button>
            </div>
          </div>
          {/* Click outside to close */}
          <div className="modal-backdrop" onClick={() => setDeleteTaskId(null)}></div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default StaffTaskList;

