import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance.js';
import InstructionModal from '../../components/admin/InstructionModal.jsx';
import ConfirmDeleteModal from '../../components/admin/ConfirmDeleteModal.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InstructionList = () => {
  const [instructions, setInstructions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const token = localStorage.getItem('token');

  const fetchInstructions = async () => {
    try {
      const res = await axiosInstance.get('/api/instruction', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInstructions(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch instructions');
    }
  };

  useEffect(() => {
    fetchInstructions();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (instruction) => {
    setEditData(instruction);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/api/instruction/delete/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Instruction deleted successfully');
      fetchInstructions();
    } catch (error) {
      toast.error('Failed to delete instruction');
    } finally {
      setDeleteModalOpen(false);
      setSelectedId(null);
    }
  };

  const handleSubmit = async (data) => {
    const method = editData ? 'put' : 'post';
    const url = editData
      ? `/api/instruction/edit/${editData._id}`
      : '/api/instruction/add';

    try {
      await axiosInstance[method](url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(`Instruction ${editData ? 'updated' : 'added'} successfully`);
      setModalOpen(false);
      fetchInstructions();
    } catch (error) {
      toast.error(`Failed to ${editData ? 'update' : 'add'} instruction`);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(instructions.length / itemsPerPage);
  const paginatedData = instructions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-primary">General Instructions</h2>
        <button className="btn btn-primary" onClick={handleAdd}>
          + Add Instruction
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-base-content/10 bg-base-100 shadow-lg">
        <table className="table w-full">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {paginatedData.map((ins, index) => (
              <tr key={ins._id} className="hover:bg-base-200 transition duration-200">
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="font-medium">{ins.title}</td>
                <td>{ins.description?.slice(0, 50)}...</td>
                <td>{new Date(ins.createdAt).toLocaleString()}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-info" onClick={() => handleEdit(ins)}>Edit</button>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(ins._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {instructions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">No instructions found.</td>
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

      <InstructionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        editData={editData}
      />

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default InstructionList;
