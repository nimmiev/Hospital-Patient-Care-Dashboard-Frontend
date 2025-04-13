import React, { useState, useEffect } from 'react';

const InstructionModal = ({ isOpen, onClose, onSubmit, editData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setDescription(editData.description);
    } else {
      setTitle('');
      setDescription('');
    }
    setErrors({});
  }, [editData]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    else if (title.length < 3) newErrors.title = 'Title must be at least 3 characters';
    if (!description.trim()) newErrors.description = 'Description is required';
    else if (description.length < 10) newErrors.description = 'Description must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title, description });
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-xl font-bold mb-4">{editData ? 'Edit' : 'Add'} Instruction</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <textarea
              placeholder="Description"
              className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editData ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default InstructionModal;
