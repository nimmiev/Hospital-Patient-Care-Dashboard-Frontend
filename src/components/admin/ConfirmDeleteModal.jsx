import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-sm bg-base-100 text-base-content">
        <h3 className="text-lg font-bold">Confirm Deletion</h3>
        <p className="py-4">Are you sure you want to delete this instruction?</p>
        <div className="modal-action">
          <button className="btn btn-error" onClick={onConfirm}>Delete</button>
          <button className="btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default ConfirmDeleteModal;
