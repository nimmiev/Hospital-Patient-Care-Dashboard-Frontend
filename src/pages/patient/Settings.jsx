import { useEffect, useState } from "react";
import { usePatientProfileForm } from "../../hooks/usePatientProfileForm";
import { usePasswordUpdate } from "../../hooks/usePasswordUpdate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Settings() {
    const {
        formData,
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
            <form onSubmit={handleSubmit} className="card bg-base-100 p-6 shadow-xl space-y-4">
                <h2 className="text-xl font-bold text-center text-primary">Update Patient Profile</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <h3 className="col-span-2 text-lg font-semibold text-base-content">Basic Information</h3>

                    <input name="name" placeholder="Full Name" className="input input-bordered w-full" value={formData.name} onChange={handleChange} />
                    <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" value={formData.email} onChange={handleChange} />
                    <input name="phone" type="text" maxLength="10" placeholder="Phone" className="input input-bordered w-full" value={formData.phone} onChange={handleChange} />
                    <input name="dateOfBirth" type="date" className="input input-bordered w-full" value={formatDate(formData.dateOfBirth)} onChange={handleChange} />

                    <div className="col-span-2">
                        <label className="font-medium text-base-content">Gender</label>
                        <div className="flex space-x-4 mt-1">
                            {["Male", "Female", "Other"].map((g) => (
                                <label key={g} className="flex items-center space-x-2 text-base-content">
                                    <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} />
                                    <span>{g}</span>
                                </label>
                            ))}
                        </div>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                    </div>

                    <h3 className="col-span-2 text-lg font-semibold text-base-content">Emergency Contact</h3>

                    <input name="emergencyContact.name" placeholder="Contact Name" className="input input-bordered w-full" value={formData.emergencyContact?.name || ""} onChange={handleChange} />
                    <input name="emergencyContact.phone" placeholder="Contact Phone" maxLength="10" className="input input-bordered w-full" value={formData.emergencyContact?.phone || ""} onChange={handleChange} />

                    <h3 className="col-span-2 text-lg font-semibold text-base-content">Medical History & Lifestyle</h3>

                    <select name="bloodType" className="select select-bordered w-full" value={formData.bloodType} onChange={handleChange}>
                        <option value="">Select Blood Type</option>
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>

                    <input name="height" type="number" placeholder="Height (cm)" className="input input-bordered w-full" value={formData.height || ""} onChange={handleChange} />
                    <input name="weight" type="number" placeholder="Weight (kg)" className="input input-bordered w-full" value={formData.weight || ""} onChange={handleChange} />

                    <textarea name="address" placeholder="Address" className="textarea textarea-bordered w-full md:col-span-2 h-24" value={formData.address || ""} onChange={handleChange} />

                    <div className="flex flex-col col-span-2 space-y-2">
                        <label className="flex items-center space-x-2 text-base-content">
                            <input type="checkbox" name="smoking" checked={formData.smoking || false} onChange={handleCheckboxChange} />
                            <span>Smoking</span>
                        </label>
                        <label className="flex items-center space-x-2 text-base-content">
                            <input type="checkbox" name="alcoholConsumption" checked={formData.alcoholConsumption || false} onChange={handleCheckboxChange} />
                            <span>Alcohol Consumption</span>
                        </label>
                    </div>

                    <div className="col-span-2">
                        <label className="font-medium text-base-content">Profile Picture</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full" />
                        {formData.imageUrl && (
                            <div className="mt-2">
                                <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-full" />
                            </div>
                        )}
                    </div>

                    {message && <p className="text-green-500 col-span-2">{message}</p>}

                    <button type="submit" className="btn btn-success w-full col-span-2 mt-4">Update Profile</button>
                </div>
            </form>

            {/* Password Update Card */}
            <form onSubmit={handlePasswordSubmit} className="card bg-base-100 p-6 shadow-xl space-y-4">
                <h2 className="text-xl font-bold text-center text-primary">Update Password</h2>

                <div>
                    <input type="password" name="password" placeholder="New Password" className="input input-bordered w-full" value={passwordData.password || ""} onChange={handlePasswordChange} />
                    {passwordErrors.password && <p className="text-red-500 text-sm">{passwordErrors.password}</p>}
                </div>

                <div>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input input-bordered w-full" value={passwordData.confirmPassword || ""} onChange={handlePasswordChange} />
                    {passwordErrors.confirmPassword && <p className="text-red-500 text-sm">{passwordErrors.confirmPassword}</p>}
                </div>

                <button type="submit" className="btn btn-secondary w-full mt-2">Update Password</button>
            </form>

            <ToastContainer />
        </div>

    );
}

