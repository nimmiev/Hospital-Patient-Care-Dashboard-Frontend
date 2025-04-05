import { ToastContainer } from "react-toastify";
import { usePatientForm } from "../../hooks/usePatientForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, errors, onSubmit } = usePatientForm();

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-black shadow-lg rounded-lg">
            <input type="radio" onClick={() => navigate(-1)} name="my_tabs_6" className="btn btn-secondary mb-4" aria-label="← Back"></input>
                
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
                Add New Patient
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium text-gray-900 dark:text-gray-300">Full Name</label>
                    <input placeholder="Enter Full Name" {...register("name")} className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-900 dark:text-gray-300">Email</label>
                    <input placeholder="Enter Email Address" {...register("email")} type="email" className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-900 dark:text-gray-300">Phone</label>
                    <input placeholder="Enter Contact Number" {...register("phone")} type="text" className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600" />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-900 dark:text-gray-300">Date of Birth</label>
                    <input placeholder="Enter Date of Birth" {...register("dateOfBirth")} type="date" className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600" />
                    {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-900 dark:text-gray-300">Password</label>
                    <input type={showPassword ? "text" : "password"} placeholder="Enter New Password" {...register("password")} className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "Hide" : "Show"}
                    </button>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-900 dark:text-gray-300">Confirm Password</label>
                    <input type={showPassword ? "text" : "password"} placeholder="Enter Password Again" {...register("confirmPassword")} className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "Hide" : "Show"}
                    </button>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-900 dark:text-gray-300">Gender</label>
                    <select {...register("gender")} className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-900 dark:text-gray-300">Blood Type</label>
                    <select {...register("bloodType")} className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600">
                        <option value="">Select</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                    {errors.bloodType && <p className="text-red-500 text-sm">{errors.bloodType.message}</p>}
                </div>

                <div className="md:col-span-2">
                    <label className="block font-medium text-gray-900 dark:text-gray-300">Address</label>
                    <textarea {...register("address")} className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600"></textarea>
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-900 dark:text-gray-300">Emergency Contact Name</label>
                    <input placeholder="Enter Contact Person Name" {...register("emergencyContact.name")} className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600" />
                    {errors.emergencyContact?.name && <p className="text-red-500 text-sm">{errors.emergencyContact.name.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-900 dark:text-gray-300">Emergency Contact Phone</label>
                    <input placeholder="Enter Contact person Number" {...register("emergencyContact.phone")} className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600" />
                    {errors.emergencyContact?.phone && <p className="text-red-500 text-sm">{errors.emergencyContact.phone.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-900 dark:text-gray-300">Height (cm)</label>
                    <input placeholder="Enter Patient Height" {...register("height")} type="number" className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600" />
                    {errors.height && <p className="text-red-500 text-sm">{errors.height.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-900 dark:text-gray-300">Weight (kg)</label>
                    <input placeholder="Enter Patient Weight" {...register("weight")} type="number" className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600" />
                    {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
                </div>

                <div className="md:col-span-2">
                    <button type="submit" className="btn btn-primary w-full">Add Patient</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddPatient;
