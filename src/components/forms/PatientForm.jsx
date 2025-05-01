
import { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { showSuccessToast, showErrorToast } from "../ToastNotification";

export default function PatientSignupForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // fetch data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyContact: { name: "", phone: "" },
    bloodType: "",
    height: "",
    weight: "",
    smoking: false,
    alcoholConsumption: false,
  });

  const validateStep = (data) => {
    let newErrors = {};

    if (step === 1) {
      if (!data.name.trim()) newErrors.name = "Full Name is required.";
      if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) newErrors.email = "Valid email is required.";
      if (!data.password) newErrors.password = "Password is required.";
      if (data.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
      if (data.confirmPassword !== data.password) newErrors.confirmPassword = "Passwords do not match.";
      if (!data.phone || !/^\d{10}$/.test(data.phone)) newErrors.phone = "Valid 10-digit phone number is required.";
      if (!data.dateOfBirth) {
        newErrors.dateOfBirth = "Date of Birth is required.";
      } else if (new Date(data.dateOfBirth) > new Date()) {
        newErrors.dateOfBirth = "Date of Birth cannot be in the future.";
      }
      if (!data.gender) newErrors.gender = "Gender selection is required.";
      if (!data.address.trim()) newErrors.address = "Address is required.";
    }

    if (step === 2) {
      if (!data.emergencyContact.name.trim()) newErrors["emergencyContact.name"] = "Emergency Contact Name is required.";
      if (!data.emergencyContact.phone || !/^\d{10}$/.test(data.emergencyContact.phone)) {
        newErrors["emergencyContact.phone"] = "Valid 10-digit emergency contact phone is required.";
      }
    }

    if (step === 3) {
      if (!data.bloodType) newErrors.bloodType = "Blood Type is required.";
      if (!data.height || isNaN(data.height) || Number(data.height) <= 0) newErrors.height = "Height must be a positive number.";
      if (!data.weight || isNaN(data.weight) || Number(data.weight) <= 0) newErrors.weight = "Weight must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      updatedFormData = {
        ...formData,
        [parent]: { ...formData[parent], [child]: value }
      };
    } else {
      updatedFormData = { ...formData, [name]: value };
    }

    setFormData(updatedFormData);

    // Live validation
    validateStep(updatedFormData);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedFormData = { ...formData, [name]: checked };
    setFormData(updatedFormData);

    // Live validation for checkboxes too
    validateStep(updatedFormData);
  };

  const nextStep = () => {
    if (validateStep(formData)) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(formData)) return;

    setMessage("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/patient/signup", formData);
      setMessage(response.data.message);
      showSuccessToast(response.data.message);

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        emergencyContact: { name: "", phone: "" },
        bloodType: "",
        height: "",
        weight: "",
        smoking: false,
        alcoholConsumption: false,
      });
      setStep(1); // Optional: Return to step 1

    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
      showErrorToast(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[700px] mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="steps w-full mb-4">
        <div className={`step ${step >= 1 ? "step-primary" : ""}`} data-content="1">Basic</div>
        <div className={`step ${step >= 2 ? "step-primary" : ""}`} data-content="2">Emergency</div>
        <div className={`step ${step >= 3 ? "step-primary" : ""}`} data-content="3">Health</div>
      </div>



      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

          {/* Name */}
          <div className="mb-2">
            <input name="name" type="text" placeholder="Full Name" className="input input-bordered w-full mb-1" value={formData.name} onChange={handleChange} required />
            <p className="text-red-500 text-sm min-h-[1rem]">{errors.name || "\u00A0"}</p>
          </div>

          {/* Email */}
          <div className="mb-2">
            <input name="email" type="email" placeholder="Email" className="input input-bordered w-full mb-1" value={formData.email} onChange={handleChange} required />
            <p className="text-red-500 text-sm min-h-[1rem]">{errors.email || "\u00A0"}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Password */}
            <div className="mb-2">
              <input name="password" type="password" placeholder="Password" className="input input-bordered w-full mb-1" value={formData.password} onChange={handleChange} required />
              <p className="text-red-500 text-sm min-h-[1rem]">{errors.password || "\u00A0"}</p>
            </div>

            {/* Confirm Password */}
            <div className="mb-2">
              <input name="confirmPassword" type="password" placeholder="Confirm Password" className="input input-bordered w-full mb-1" value={formData.confirmPassword} onChange={handleChange} required />
              <p className="text-red-500 text-sm min-h-[1rem]">{errors.confirmPassword || "\u00A0"}</p>
            </div>

            {/* Date of Birth with Floating Label */}
            <div className="mb-2 relative">
              <label className="text-xs text-gray-500 absolute left-3 top-1 z-10 bg-white px-1">Birth Date</label>
              <input name="dateOfBirth" type="date" className="input input-bordered w-full pt-4 mb-1" value={formData.dateOfBirth} onChange={handleChange} required />
              <p className="text-red-500 text-sm min-h-[1rem]">{errors.dateOfBirth || "\u00A0"}</p>
            </div>

            {/* Phone */}
            <div className="mb-2">
              <input name="phone" type="text" placeholder="Phone" className="input input-bordered w-full mb-1" maxLength="10" value={formData.phone} onChange={handleChange} required />
              <p className="text-red-500 text-sm min-h-[1rem]">{errors.phone || "\u00A0"}</p>
            </div>
          </div>

          {/* Gender */}
          <div className="mb-2">
            <label className="block mb-1">Gender</label>
            <div className="flex space-x-4">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center">
                  <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} />
                  <span className="ml-2">{g}</span>
                </label>
              ))}
            </div>
            <p className="text-red-500 text-sm min-h-[1rem]">{errors.gender || "\u00A0"}</p>
          </div>

          {/* Address */}
          <div className="mb-2">
            <textarea name="address" placeholder="Address" className="textarea textarea-bordered w-full mb-1" value={formData.address} onChange={handleChange} required />
            <p className="text-red-500 text-sm min-h-[1rem]">{errors.address || "\u00A0"}</p>
          </div>

          {/* Button */}
          <button onClick={nextStep} className="btn btn-primary w-full" disabled={Object.keys(errors).length > 0}>
            Next
          </button>

        </div>

      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Emergency Contact</h2>
          <div className="mb-2">
            <input name="emergencyContact.name" type="text" placeholder="Contact Name" className="input input-bordered w-full mb-2" value={formData.emergencyContact.name} onChange={handleChange} />
            <p className="text-red-500 text-sm min-h-[1rem]">{errors["emergencyContact.name"] || "\u00A0"}</p>
          </div>

          <div className="mb-2">
            <input name="emergencyContact.phone" type="tel" placeholder="Contact Phone" className="input input-bordered w-full mb-2" value={formData.emergencyContact.phone} onChange={handleChange} maxLength="10" />
            <p className="text-red-500 text-sm min-h-[1rem]">{errors["emergencyContact.phone"] || "\u00A0"}</p>
          </div>

          <div className="flex justify-between">
            <button onClick={prevStep} className="btn btn-secondary">Back</button>
            <button onClick={nextStep} className="btn btn-primary" disabled={Object.keys(errors).length > 0}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Medical History & Lifestyle</h2>

          <div className="mb-2">
            <select name="bloodType" className="select select-bordered w-full mb-2" value={formData.bloodType} onChange={handleChange}>
              <option value="">Select Blood Type</option>
              {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <p className="text-red-500 text-sm min-h-[1rem]">{errors.bloodType || "\u00A0"}</p>
            {/* {errors.bloodType && <p className="text-red-500">{errors.bloodType}</p>} */}
          </div>

          <div className="mb-2">
            <input name="height" type="number" placeholder="Height (cm)" className="input input-bordered w-full mb-3" value={formData.height} onChange={handleChange} required />
            <p className="text-red-500 text-sm min-h-[1rem]">{errors.height || "\u00A0"}</p>
            {/* {errors.height && <p className="text-red-500">{errors.height}</p>} */}
          </div>

          <div className="mb-2">
            <input name="weight" type="number" placeholder="Weight (kg)" className="input input-bordered w-full mb-3" value={formData.weight} onChange={handleChange} required />
            <p className="text-red-500 text-sm min-h-[1rem]">{errors.weight || "\u00A0"}</p>
            {/* {errors.weight && <p className="text-red-500">{errors.weight}</p>} */}
          </div>

          <div className="mb-2">
            <label className="flex items-center space-x-2">
              <input name="smoking" type="checkbox" checked={formData.smoking} onChange={handleCheckboxChange} />
              <span>Smoking</span>
              {/* {errors.smoking && <p className="text-red-500">{errors.smoking}</p>} */}
            </label>
            <p className="text-red-500 text-sm min-h-[1rem]">{errors.smoking || "\u00A0"}</p>
          </div>

          <div className="mb-2">
            <label className="flex items-center space-x-2">
              <input name="alcoholConsumption" type="checkbox" checked={formData.alcoholConsumption} onChange={handleCheckboxChange} />
              <span>Alcohol Consumption</span>
              {/* {errors.alcoholConsumption && <p className="text-red-500">{errors.alcoholConsumption}</p>} */}
            </label>
            <p className="text-red-500 text-sm min-h-[1rem]">{errors.alcoholConsumption || "\u00A0"}</p>
          </div>

          <div className="flex justify-between">
            <button onClick={prevStep} className="btn btn-secondary">Back</button>
            <button onClick={nextStep} className="btn btn-primary" disabled={Object.keys(errors).length > 0}>Next</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Confirm & Submit</h2>
          <p className="mb-4">Review your details before submitting.</p>

          <div className="mb-4 space-y-2 text-sm text-gray-700">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
            <p><strong>Gender:</strong> {formData.gender}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>Emergency Contact:</strong> {formData.emergencyContact.name} ({formData.emergencyContact.phone})</p>
            <p><strong>Blood Type:</strong> {formData.bloodType}</p>
            <p><strong>Height:</strong> {formData.height} cm</p>
            <p><strong>Weight:</strong> {formData.weight} kg</p>
            <p><strong>Smoking:</strong> {formData.smoking ? "Yes" : "No"}</p>
            <p><strong>Alcohol Consumption:</strong> {formData.alcoholConsumption ? "Yes" : "No"}</p>
          </div>

          {message && <p className="text-green-500">{message}</p>}

          <div className="flex justify-between">
            <button onClick={prevStep} className="btn btn-secondary">Back</button>
            <button type="submit" className="btn btn-success" onClick={handleSubmit} disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
          </div>
        </div>
      )}
    </div>
  );
}