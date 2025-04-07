import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statusOptions = ["Pending", "Completed", "Reassigned"];

const UpdateTask = () => {
  const { taskId } = useParams();
// console.log({taskId})
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axiosInstance.get(`/api/admin/task/${taskId}`);
        const task = res.data.data;
        setTaskDescription(task.taskDescription);
        setStatus(task.status);
      } catch (error) {
        console.error("Fetch task error:", error);
        toast.error("Failed to fetch task data");
      }
    };

    fetchTask();
  }, [taskId]);

  const validateForm = () => {
    const newErrors = {};
    if (!taskDescription.trim()) newErrors.taskDescription = "Description is required";
    if (!status) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axiosInstance.post(`/api/admin/edit-task/${taskId}`, {
        taskDescription,
        status,
      });
      toast.success("Task updated successfully!");
    } catch (err) {
      console.error("Update task error:", err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Update Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Task Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="3"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          {errors.taskDescription && <p className="text-red-500 text-sm mt-1">{errors.taskDescription}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="select select-bordered w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select status</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Task
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateTask;
