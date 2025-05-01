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
        setFormData,
        handleAddFamilyHistory,
        handleRemoveFamilyHistory,
        loading
    } = usePatientProfileForm();

    const {
        passwordData,
        handlePasswordChange,
        handlePasswordSubmit,
        errors: passwordErrors,
        ploading
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

                    <h3 className="col-span-2 text-lg font-semibold text-info">Basic Information</h3>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Full Name</label>
                        <input name="name" placeholder="Full Name" className="input input-bordered w-full" value={formData.name || ''} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Email</label>
                        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" value={formData.email || ''} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Phone</label>
                        <input name="phone" type="text" maxLength="10" placeholder="Phone" className="input input-bordered w-full" value={formData.phone || ''} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Date of Birth</label>
                        <input name="dateOfBirth" type="date" className="input input-bordered w-full" value={formatDate(formData.dateOfBirth)} onChange={handleChange} />
                    </div>

                    <div className="col-span-1">
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

                    {/* profile picture */}
                    <div className="col-span-1 flex flex-col">
                        <label className="font-medium text-base-content">Profile Picture</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full" />
                        {formData.imageUrl && (
                            <div className="mt-2">
                                <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-full" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Address</label>
                        <textarea name="address" placeholder="Address" className="textarea textarea-bordered w-full" value={formData.address || ""} onChange={handleChange} />
                    </div>

                    {/* insurance details */}
                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Insurance Provider</label>
                        <input name="insurance.provider" type="text" placeholder="Insurance Provider" className="input input-bordered w-full" value={formData.insurance?.provider || ""} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Policy Number</label>
                        <input name="insurance.policyNumber" type="text" placeholder="Policy Number" className="input input-bordered w-full" value={formData.insurance?.policyNumber || ""} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Insurance Expiration Date</label>
                        <input name="insurance.expirationDate" type="date" className="input input-bordered w-full" value={formData.insurance?.expirationDate ? formatDate(formData.insurance.expirationDate) : ""} onChange={handleChange} />
                    </div>

                    <h3 className="col-span-2 text-lg font-semibold text-info">Emergency Contact</h3>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Contact Name</label>
                        <input name="emergencyContact.name" placeholder="Contact Name" className="input input-bordered w-full" value={formData.emergencyContact?.name || ""} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Contact Phone</label>
                        <input name="emergencyContact.phone" placeholder="Contact Phone" maxLength="10" className="input input-bordered w-full" value={formData.emergencyContact?.phone || ""} onChange={handleChange} />
                    </div>

                    <h3 className="col-span-2 text-lg font-semibold text-info">Medical History & Lifestyle</h3>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Blood Type</label>
                        <select name="bloodType" className="select select-bordered w-full" value={formData.bloodType || ""} onChange={handleChange}>
                            <option value="">Select Blood Type</option>
                            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Height (cm)</label>
                        <input name="height" type="number" placeholder="Height (cm)" className="input input-bordered w-full" value={formData.height || ""} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Weight (kg)</label>
                        <input name="weight" type="number" placeholder="Weight (kg)" className="input input-bordered w-full" value={formData.weight || ""} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Diet Preference</label>
                        <select name="dietPreference" className="select select-bordered w-full" value={formData.dietPreference || ""} onChange={handleChange}>
                            <option value="">Select Diet Preference</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Physical Activity Level</label>
                        <select name="physicalActivityLevel" className="select select-bordered w-full" value={formData.physicalActivityLevel || ""} onChange={handleChange}>
                            <option value="">Select Physical Activity Level</option>
                            <option value="Sedentary">Sedentary</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Active">Active</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Sleep Patterns</label>
                        <select name="sleepPatterns" className="select select-bordered w-full" value={formData.sleepPatterns || ""} onChange={handleChange}>
                            <option value="">Select Sleep Pattern</option>
                            <option value="Less than 6 hours">Less than 6 hours</option>
                            <option value="7-8 hours per night">7-8 hours per night</option>
                            <option value="More than 8 hours">More than 8 hours</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Allergies</label>
                        <textarea name="allergies" placeholder="Allergies (comma separated)" className="textarea textarea-bordered w-full" value={formData.allergies?.join(", ") || ""} onChange={(e) => setFormData({ ...formData, allergies: e.target.value.split(",").map(item => item.trim()) })} />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Pre-Existing Conditions</label>
                        <textarea name="preExistingConditions" placeholder="Pre-Existing Conditions (comma separated)" className="textarea textarea-bordered w-full" value={formData.preExistingConditions?.join(", ") || ""} onChange={(e) => setFormData({ ...formData, preExistingConditions: e.target.value.split(",").map(item => item.trim()) })} />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Medications</label>
                        <textarea name="medications" placeholder="Medications (comma separated)" className="textarea textarea-bordered w-full" value={formData.medications?.join(", ") || ""} onChange={(e) => setFormData({ ...formData, medications: e.target.value.split(",").map(item => item.trim()) })} />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Past-Surgeries</label>
                        <textarea name="pastSurgeries" placeholder="Past-Surgeries (comma separated)" className="textarea textarea-bordered w-full" value={formData.pastSurgeries?.join(", ") || ""} onChange={(e) => setFormData({ ...formData, pastSurgeries: e.target.value.split(",").map(item => item.trim()) })} />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Chronic Diseases</label>
                        <textarea name="chronicDiseases" placeholder="Chronic Diseases (comma separated)" className="textarea textarea-bordered w-full" value={formData.chronicDiseases?.join(", ") || ""} onChange={(e) => setFormData({ ...formData, chronicDiseases: e.target.value.split(",").map(item => item.trim()) })} />
                    </div>

                    {/* life style habits checkbox */}
                    <div className="flex flex-col">
                        <label className="font-medium text-base-content mb-2">Lifestyle Habits</label>
                        <label className="flex items-center space-x-2 text-base-content">
                            <input type="checkbox" name="smoking" checked={formData.smoking || false} onChange={handleCheckboxChange} />
                            <span>Smoking</span>
                        </label>
                        <label className="flex items-center space-x-2 text-base-content">
                            <input type="checkbox" name="alcoholConsumption" checked={formData.alcoholConsumption || false} onChange={handleCheckboxChange} />
                            <span>Alcohol Consumption</span>
                        </label>
                    </div>

                    <h3 className="col-span-2 text-lg font-semibold text-info">Family History</h3>

                    {/* Check if familyHistory is empty and display the "Add Family History" button */}
                    {formData.familyHistory.length === 0 && (
                        <button
                            type="button"
                            onClick={handleAddFamilyHistory}
                            className="btn btn-primary btn-sm mt-4 col-span-2"
                        >
                            Add Family History
                        </button>
                    )}

                    {/* Family History Rows */}
                    <div className="grid grid-cols-1 col-span-2 gap-4">
                        {Array.isArray(formData.familyHistory) && formData.familyHistory.map((item, index) => (
                            <div key={index} className="grid grid-cols-8 gap-4 items-center">
                                <input type="text" name={`familyHistory.${index}.condition`} placeholder="Disease (e.g., Diabetes)"
                                    className="input input-bordered w-full col-span-3" value={item.condition || ""} onChange={handleChange} />
                                <input type="text" name={`familyHistory.${index}.relation`} placeholder="Relation (e.g., Father)"
                                    className="input input-bordered w-full col-span-3" value={item.relation || ""} onChange={handleChange} />
                                <button type="button" onClick={handleAddFamilyHistory} className="btn btn-primary btn-sm w-full col-span-1" >+</button>
                                <button type="button" onClick={() => handleRemoveFamilyHistory(index)} className="btn btn-error btn-sm w-full col-span-1" >-</button>
                            </div>
                        ))}
                    </div>

                    <h3 className="col-span-2 text-lg font-semibold text-info">Emergency Preferences</h3>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Preferred Hospital</label>
                        <input name="emergencyPreferences.preferredHospital" type="text" placeholder="Preferred Hospital" className="input input-bordered w-full" value={formData.emergencyPreferences?.preferredHospital || ""} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-base-content">Primary Care Physician</label>
                        <input name="emergencyPreferences.primaryCarePhysician" type="text" placeholder="Primary Care Physician" className="input input-bordered w-full" value={formData.emergencyPreferences?.primaryCarePhysician || ""} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col">
                        <label className="flex items-center space-x-2 text-base-content">
                            <input type="checkbox" name="emergencyPreferences.doNotResuscitate" checked={formData.emergencyPreferences?.doNotResuscitate || false} onChange={handleCheckboxChange} />
                            <span>doNotResuscitate</span>
                        </label>
                    </div>

                    {message && <p className="text-green-500 col-span-2">{message}</p>}

                    {/* Submit Button */}
                    <div className="col-span-2">
                        <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? 'Updating...' : 'Update Profile'}</button>
                    </div>

                    {/* Show Form Errors */}
                    {errors.general && (
                        <p className="text-red-500 text-center mt-2">{errors.general}</p>
                    )}

                    <ToastContainer />
                </div>
            </form>

            {/* Password Update Card */}
            <form onSubmit={handlePasswordSubmit} className="card bg-base-100 p-6 shadow-xl space-y-4">
                <h2 className="text-xl font-bold text-center text-primary">Update Password</h2>

                <div>
                    <label className="font-medium text-base-content">New Password</label>
                    <input type="password" name="password" placeholder="New Password" className="input input-bordered w-full" value={passwordData.password || ""} onChange={handlePasswordChange} />
                    {passwordErrors.password && <p className="text-red-500 text-sm">{passwordErrors.password}</p>}
                </div>

                <div>
                    <label className="font-medium text-base-content">Confirm Password</label>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input input-bordered w-full" value={passwordData.confirmPassword || ""} onChange={handlePasswordChange} />
                    {passwordErrors.confirmPassword && <p className="text-red-500 text-sm">{passwordErrors.confirmPassword}</p>}
                </div>

                <button type="submit" className="btn btn-secondary w-full mt-2" disabled={ploading}>{ploading ? 'Updating...' : 'Update Password'}</button>

                <ToastContainer />
            </form>
        </div>
    );
}
