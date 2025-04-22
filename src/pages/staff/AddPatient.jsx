import { ToastContainer } from "react-toastify";
import { usePatientForm } from "../../hooks/usePatientForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, errors, onSubmit } = usePatientForm();

    return (
        <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
            <input
                type="radio"
                onClick={() => navigate(-1)}
                name="my_tabs_6"
                className="btn btn-secondary mb-4"
                aria-label="← Back"
            />

            <h2 className="text-3xl font-bold text-center mb-6 text-base-content">
                Add New Patient
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Full Name */}
                <div className="form-control">
                    <label className="block label"><span className="label-text">Full Name</span></label>
                    <input placeholder="Enter Full Name" {...register("name")} className="input input-bordered" />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="form-control">
                    <label className="block label"><span className="label-text">Email</span></label>
                    <input type="email" placeholder="Enter Email Address" {...register("email")} className="input input-bordered" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div className="form-control">
                    <label className="block label"><span className="label-text">Phone</span></label>
                    <input type="text" placeholder="Enter Contact Number" {...register("phone")} className="input input-bordered" />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                {/* DOB */}
                <div className="form-control">
                    <label className="block label"><span className="label-text">Date of Birth</span></label>
                    <input type="date" {...register("dateOfBirth")} className="input input-bordered" />
                    {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1 w-70">{errors.dateOfBirth.message}</p>}
                </div>

                {/* Password */}
                <div className="form-control">
                    <label className="block label"><span className="label-text">Password</span></label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter New Password"
                        {...register("password")}
                        className="block input input-bordered"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="mt-1 text-sm text-primary">
                        {showPassword ? "Hide" : "Show"}
                    </button>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div className="form-control">
                    <label className="block label"><span className="label-text">Confirm Password</span></label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password Again"
                        {...register("confirmPassword")}
                        className="block input input-bordered"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="mt-1 text-sm text-primary">
                        {showPassword ? "Hide" : "Show"}
                    </button>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>

                {/* Gender */}
                <div className="form-control">
                    <label className="block label"><span className="label-text">Gender</span></label>
                    <select {...register("gender")} className="select select-bordered">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
                </div>

                {/* Blood Type */}
                <div className="form-control">
                    <label className="block label"><span className="label-text">Blood Type</span></label>
                    <select {...register("bloodType")} className="select select-bordered">
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
                    {errors.bloodType && <p className="text-red-500 text-sm mt-1">{errors.bloodType.message}</p>}
                </div>

                {/* Address */}
                <div className="form-control md:col-span-2">
                    <label className="block label"><span className="label-text">Address</span></label>
                    <textarea
                        {...register("address")}
                        placeholder="Enter Address"
                        className="textarea textarea-bordered w-190"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>

                {/* Emergency Contact Name */}
                <div className="form-control">
                    <label className="block label"><span className="label-text">Emergency Contact Name</span></label>
                    <input placeholder="Enter Contact Person Name" {...register("emergencyContact.name")} className="input input-bordered" />
                    {errors.emergencyContact?.name && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact.name.message}</p>}
                </div>

                {/* Emergency Contact Phone */}
                <div className="form-control">
                    <label className="block label"><span className="label-text">Emergency Contact Phone</span></label>
                    <input placeholder="Enter Contact person Number" {...register("emergencyContact.phone")} className="input input-bordered" />
                    {errors.emergencyContact?.phone && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact.phone.message}</p>}
                </div>

                {/* Height */}
                <div className="form-control">
                    <label className="block label"><span className="label-text">Height (cm)</span></label>
                    <input type="number" placeholder="Enter Patient Height" {...register("height")} className="input input-bordered" />
                    {errors.height && <p className="text-red-500 text-sm mt-1 w-70">{errors.height.message}</p>}
                </div>

                {/* Weight */}
                <div className="form-control">
                    <label className="block label"><span className="label-text">Weight (kg)</span></label>
                    <input type="number" placeholder="Enter Patient Weight" {...register("weight")} className="input input-bordered" />
                    {errors.weight && <p className="text-red-500 text-sm mt-1 w-70">{errors.weight.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="form-control md:col-span-2">
                    <button type="submit" className="btn btn-primary w-190">
                        Add Patient
                    </button>
                </div>
            </form>

            <ToastContainer />
        </div>

    );
};

export default AddPatient;
