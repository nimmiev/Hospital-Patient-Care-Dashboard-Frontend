import { useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = () => {
  const { staffId } = useParams(); // get staffId from URL
//   console.log(staffId)
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskDescription.trim()) {
      setError("Task description is required.");
      return;
    }

    try {
      await axiosInstance.post("/api/admin/add-task", {
        staffId,
        taskDescription,
      });

      toast.success("Task added successfully!");
      setTaskDescription("");
      setError("");
    } catch (err) {
      console.error("Task Add Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Task Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="3"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          ></textarea>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Task
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddTask;
