import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminStaff = () => {

  const [staffs, setStaffs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteStaffId, setDeleteStaffId] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/staff");
      // console.log("Staffs Data:", response.data.data);
      setStaffs(response.data.data);
    } catch (error) {
      console.error("Error fetching Staffs:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await axiosInstance.put(`/api/admin/staffApproval/${id}`);
      toast.success("Staff approved successfully!");
      fetchStaffs(); // Refresh the data
    } catch (error) {
      toast.error("Error approving staff!");
      console.error("Error approving staff:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axiosInstance.put(`/api/admin/staffReject/${id}`);
      toast.success("Staff rejected successfully!");
      fetchStaffs(); // Refresh the data
    } catch (error) {
      toast.error("Error rejecting staff!");
      console.error("Error rejecting staff:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!deleteStaffId) return;
    try {
      await axiosInstance.delete(`/api/admin/staff/${deleteStaffId}`);
      toast.success("Staff deleted successfully!");
      fetchStaffs();
    } catch (error) {
      toast.error("Error deleting staff!");
      console.error("Error deleting staff:", error);
    } finally {
      setDeleteStaffId(null); // Close modal
    }
    };

  // Pagination logic
  const totalPages = Math.ceil(staffs.length / itemsPerPage);
  const paginatedData = staffs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // console.log(staffs)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        
        {/* Back navigating button */}
        <button type="radio" onClick={() => navigate(-1)} name="my_tabs_6" className="btn btn-secondary mb-4" >← Back</button>
        
        <h2 className="text-2xl font-semibold mb-4 text-center text-primary">Staff Management List</h2>

        <div></div>
      
        {/* <button className="btn btn-primary" onClick={() => navigate("/admin/staff/add-staff")}>
          + Add Staff
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
            {paginatedData.map((staff, index) => (
              <tr
                key={staff._id}
                className="hover:bg-base-200 transition duration-200"
              >
                <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="p-3">{staff.name}</td>
                <td className="p-3">{staff.email}</td>
                <td className="p-3">{staff.phone}</td>
                <td className={`p-3 ${ staff.approved === true ? 'text-green-600' : staff.approved === false ? 'text-red-500' : 'text-yellow-500' }`}> {
                    staff.approved === true ? "Accepted" :
                    staff.approved === false ? "Rejected" : "Requested" }
                </td>
                <td className="p-3 flex space-x-2">
                  <button className="btn btn-sm btn-info" onClick={() => navigate(`/admin/staff/${staff._id}`)}>View</button>
                  <button className="btn btn-sm btn-accent" onClick={() => handleApprove(staff._id)}>Approve</button>
                  <button className="btn btn-sm btn-warning" onClick={() => handleReject(staff._id)}>Reject</button>
                  <button className="btn btn-sm btn-error" onClick={() => setDeleteStaffId(staff._id)}>Delete</button>
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
      {deleteStaffId && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this staff?</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn" onClick={() => setDeleteStaffId(null)}>Cancel</button>
            </div>
          </div>
          {/* Click outside to close */}
          <div className="modal-backdrop" onClick={() => setDeleteStaffId(null)}></div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminStaff;

