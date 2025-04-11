import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { usePatientProfileForm } from "../../hooks/usePatientProfileForm";
import { usePasswordUpdate } from "../../hooks/usePasswordUpdate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Settings() {

    const {
        formData,
        setFormData,
        handleChange,
        handleCheckboxChange,
        handleImageChange,
        handleSubmit,
        errors,
        message,
    } = usePatientProfileForm();

    const {
        passwordData,
        handlePasswordChange,
        handlePasswordSubmit,
        errors: passwordErrors,
    } = usePasswordUpdate();

    const formatDate = (isoString) => {
        return isoString ? new Date(isoString).toISOString().split("T")[0] : "";
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-5xl mx-auto p-4">
            {/* Profile Update Card */}
            {/* <form onSubmit={handleSubmit} className="max-4xl p-6 bg-white shadow-lg rounded-lg"> */}
            <form onSubmit={handleSubmit} className="card bg-white p-6 shadow-xl space-y-4">

                <h2 className="text-xl font-bold mb-6 col-span-2 text-center">Update Profile</h2>

                {/* Grid Wrapper */}
                <div className="grid grid-cols-2 gap-4">

                    {/* Basic Information */}
                    <h3 className="text-lg font-semibold col-span-2">Basic Information</h3>

                    <input name="name" placeholder="Full Name" className="input input-bordered w-full" value={formData.name} onChange={handleChange} />
                    <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" value={formData.email} onChange={handleChange} />
                    <input name="phone" type="text" maxLength="10" placeholder="Phone" className="input input-bordered w-full" value={formData.phone} onChange={handleChange} />
                    <input name="dateOfBirth" type="date" className="input input-bordered w-full" value={formatDate(formData.dateOfBirth)} onChange={handleChange} />

                    {/* Gender Full Width */}
                    <div className="col-span-2">
                        <label className="font-medium">Gender</label>
                        <div className="flex space-x-4 mt-1">
                            {["Male", "Female", "Other"].map((g) => (
                                <label key={g} className="flex items-center space-x-2">
                                    <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} />
                                    <span>{g}</span>
                                </label>
                            ))}
                        </div>
                        {errors.gender && <p className="text-red-500">{errors.gender}</p>}
                    </div>

                    {/* Emergency Contact */}
                    <h3 className="text-lg font-semibold col-span-2 mt-6">Emergency Contact</h3>

                    <input name="emergencyContact.name" placeholder="Contact Name" className="input input-bordered w-full" value={formData.emergencyContact?.name || ""} onChange={handleChange} />
                    <input name="emergencyContact.phone" placeholder="Contact Phone" maxLength="10" className="input input-bordered w-full" value={formData.emergencyContact?.phone || ""} onChange={handleChange} />

                    {/* Medical History */}
                    <h3 className="text-lg font-semibold col-span-2 mt-6">Medical History & Lifestyle</h3>

                    <select name="bloodType" className="select select-bordered w-full" value={formData.bloodType} onChange={handleChange}>
                        <option value="">Select Blood Type</option>
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <input name="height" type="number" placeholder="Height (cm)" className="input input-bordered w-full" value={formData.height || ""} onChange={handleChange} />
                    <input name="weight" type="number" placeholder="Weight (kg)" className="input input-bordered w-full" value={formData.weight || ""} onChange={handleChange} />

                    <textarea name="address" placeholder="Address" className="textarea textarea-bordered w-full h-24" value={formData.address || ""} onChange={handleChange} />

                    {/* Lifestyle Checkboxes Full Width */}
                    <div className="flex flex-col col-span-2 space-y-2">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" name="smoking" checked={formData.smoking || false} onChange={handleCheckboxChange} />
                            <span>Smoking</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" name="alcoholConsumption" checked={formData.alcoholConsumption || false} onChange={handleCheckboxChange} />
                            <span>Alcohol Consumption</span>
                        </label>
                    </div>

                    {/* Update profile pic */}
                    <div className="col-span-2">
                        <label className="font-medium">Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input file-input-bordered w-full"
                        />
                        {formData.imageUrl && (
                            <div className="mt-2">
                                <img
                                    src={formData.imageUrl}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-full"
                                />
                            </div>
                        )}
                    </div>

                    {message && <p className="text-green-500 col-span-2">{message}</p>}

                    <button type="submit" className="btn btn-success w-full col-span-2 mt-4">Update Profile</button>
                </div>
            </form>

            {/* Password Update Card */}
            <form onSubmit={handlePasswordSubmit} className="card bg-white ...">
                <h2 className="text-xl font-bold text-center mb-6">Update Password</h2>

                <div className="space-y-2">
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        className="input input-bordered w-full"
                        value={passwordData.password || ""}
                        onChange={handlePasswordChange}
                    />
                    {/* {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>} */}
                    {passwordErrors.password && <p className="text-red-500 text-sm">{passwordErrors.password}</p>}

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="input input-bordered w-full"
                        value={passwordData.confirmPassword || ""}
                        onChange={handlePasswordChange}
                    />
                    {/* {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>} */}
                    {passwordErrors.confirmPassword && <p className="text-red-500 text-sm">{passwordErrors.confirmPassword}</p>}
                </div>

                {/* <button type="submit" className="btn btn-secondary w-full">Update Password</button> */}
                <button type="submit" className="btn btn-secondary mt-4">Update Password</button>
            </form>
            <ToastContainer />
        </div>
    );
}
