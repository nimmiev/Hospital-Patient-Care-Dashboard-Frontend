import { ToastContainer } from "react-toastify";
import { useAdminForm } from "../../hooks/useAdminForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        formData,
        handleChange,
        handleSubmit,
        errors,
      } = useAdminForm();
    const navigate = useNavigate();

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-black shadow-lg rounded-lg">
      <input
        type="radio"
        onClick={() => navigate(-1)}
        name="my_tabs_6"
        className="btn btn-secondary mb-4"
        aria-label="← Back"
      />

      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
        Add New Admin
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block font-medium text-gray-900 dark:text-gray-300">Full Name</label>
          <input
            name="name"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-gray-900 dark:text-gray-300">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium text-gray-900 dark:text-gray-300">Phone</label>
          <input
            name="phone"
            type="text"
            placeholder="Enter Contact Number"
            value={formData.phone}
            onChange={handleChange}
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium text-gray-900 dark:text-gray-300">Password</label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter New Password"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="mt-1 text-sm text-primary">
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-medium text-gray-900 dark:text-gray-300">Confirm Password</label>
          <input
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password Again"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="mt-1 text-sm text-primary">
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full">Add Admin</button>
        </div>
      </form>

      <ToastContainer />
    </div>
    );
};

export default AddAdmin;
