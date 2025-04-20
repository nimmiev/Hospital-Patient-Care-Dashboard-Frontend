import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskList = () => {
    const [tasks, setTask] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        try {
            const response = await axiosInstance.get("/api/staff/task");
            // console.log(response)
            setTask(response.data.data);
        } catch (error) {
            console.error("Error fetching Task:", error);
        }
    };

    const handleUpdateTask = async () => {
        try {
            await axiosInstance.put(`/api/staff/update/${selectedTask._id}`, {
                status: updatedStatus
            });
            toast.success("Task updated successfully");
            setIsModalOpen(false);
            fetchTask(); // Refresh list
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Failed to update task");
        }
    };


    const handleEditClick = (task) => {
        setSelectedTask(task);
        setUpdatedStatus(task.status);
        setIsModalOpen(true);
    };


    //   const handleSearch = async () => {
    //     if (!searchQuery.trim()) {
    //       fetchBloodbanks();
    //       return;
    //     }

    //     try {
    //       const response = await axiosInstance.get(
    //           `/api/staff/search-bloodbank?bloodgroup=${searchQuery}`
    //       );
    //       setBloodbanks(response.data.data);
    //       setCurrentPage(1);
    //     } catch (error) {
    //       console.error("Error searching bloodbanks:", error);
    //       toast.error("Error searching bloodbanks");
    //     }
    //   };

    // Pagination
    const totalPages = Math.ceil(tasks.length / itemsPerPage);
    const paginatedData = tasks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="btn btn-secondary"
                >
                    ← Back
                </button>
                <h2 className="text-2xl font-semibold text-primary text-center w-full">
                    Task List
                </h2>
                <div className="flex gap-2 w-full md:w-auto justify-end">
                    {/* <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search by Blood Group"
            className="input input-bordered w-full md:w-48"
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button> */}
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-base-content/10 bg-base-100 shadow-lg">
                <table className="table w-full">
                    <thead className="bg-primary text-primary-content">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Task</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-300">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((task, index) => (
                                <tr key={task._id} className="hover:bg-base-200 transition">
                                    <td className="p-3">
                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                    </td>
                                    <td className="p-3">{task.taskDescription}</td>
                                    <td className="p-3">
                                        <span className={
                                            task.status === 'Pending' ? 'text-yellow-600' :
                                                task.status === 'In Progress' ? 'text-blue-600' :
                                                    task.status === 'Completed' ? 'text-green-600' :
                                                        'text-gray-500'
                                        }>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <button className="btn btn-sm btn-warning" onClick={() => handleEditClick(task)}>Update</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4 text-gray-500">
                                    No tasks found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (

                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">Update Task</h3>
                        <div>
                            <label className="block mb-1 font-medium">Status</label>
                            <select
                                className="select select-bordered w-full"
                                value={updatedStatus}
                                onChange={(e) => setUpdatedStatus(e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <button className="btn" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={handleUpdateTask}>
                                Update
                            </button>
                        </div>
                    </div>
                    {/* Click outside to close */}
                    <div className="modal-backdrop" onClick={() => setIsModalOpen(null)}></div>
                </div>
                // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                //     <div className="bg-base-white rounded-xl p-6 w-full max-w-md shadow-xl space-y-4">
                //         <h3 className="text-xl font-bold text-base-800">Update Task</h3>

                //         <div>
                //             <label className="block mb-1 font-medium">Status</label>
                //             <select
                //                 className="select select-bordered w-full"
                //                 value={updatedStatus}
                //                 onChange={(e) => setUpdatedStatus(e.target.value)}
                //             >
                //                 <option value="Pending">Pending</option>
                //                 <option value="In Progress">In Progress</option>
                //                 <option value="Completed">Completed</option>
                //             </select>
                //         </div>

                //         <div className="flex justify-end gap-2 pt-4">
                //             <button className="btn" onClick={() => setIsModalOpen(false)}>
                //                 Cancel
                //             </button>
                //             <button className="btn btn-primary" onClick={handleUpdateTask}>
                //                 Update
                //             </button>
                //         </div>
                //     </div>
                // </div>
            )}


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

export default TaskList;
