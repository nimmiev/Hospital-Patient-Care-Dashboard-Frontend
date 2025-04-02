
import { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { showSuccessToast, showErrorToast } from "../ToastNotification";

export default function PatientSignupForm() {
  const [step, setStep] = useState(1);

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

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // validation
  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Full Name is required.";
      if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email is required.";
      if (!formData.password) newErrors.password = "Password is required.";
      if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
      if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match.";
      if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Valid 10-digit phone number is required.";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";
      if (!formData.gender) newErrors.gender = "Gender selection is required.";
      if (!formData.address.trim()) newErrors.address = "Address is required.";
    }

    if (step === 2) {
      if (!formData.emergencyContact.name.trim()) newErrors["emergencyContact.name"] = "Emergency Contact Name is required.";
      if (!formData.emergencyContact.phone || !/^\d{10}$/.test(formData.emergencyContact.phone)) {
        newErrors["emergencyContact.phone"] = "Valid 10-digit emergency contact phone is required.";
      }
    }

    if (step === 3) {
      if (!formData.bloodType) newErrors.bloodType = "Blood Type is required.";
      if (!formData.height || formData.height <= 0) newErrors.height = "Height must be a positive number.";
      if (!formData.weight || formData.weight <= 0) newErrors.weight = "Weight must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parent]: { ...prevData[parent], [child]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setMessage("");

    try {
      const response = await axiosInstance.post("/api/patient/signup", formData);
      setMessage(response.data.message);

      // Show success toast message
      showSuccessToast(response.data.message);

    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
      showErrorToast(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          
          <input name="name" type="text" placeholder="Full Name" className="input input-bordered w-full mb-3" value={formData.name} onChange={handleChange} required />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          
          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full mb-3" value={formData.email} onChange={handleChange} required />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <div className="grid grid-cols-2 gap-4">
            
            <input name="password" type="password" placeholder="Password" className="input input-bordered w-full mb-3" value={formData.password} onChange={handleChange} required />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
            
            <input name="confirmPassword" type="password" placeholder="Confirm Password" className="input input-bordered w-full mb-3" value={formData.confirmPassword} onChange={handleChange} required />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
            
            <input name="dateOfBirth" type="date" placeholder="Date of Birth" className="input input-bordered w-full mb-3" value={formData.dateOfBirth} onChange={handleChange} required />
            {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth}</p>}
            
            <input name="phone" type="text" placeholder="Phone" className="input input-bordered w-full mb-3" maxLength="10" value={formData.phone} onChange={handleChange} required />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>

          {/* <div className="mb-3">
            <label className="block font-medium">Gender</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
              <input type="radio" name="gender" value="male" className="radio" onChange={handleChange} checked={formData.gender === "male"} required />
              <span>Male</span>
              </label>

              <label className="flex items-center space-x-2">
                <input type="radio" name="gender" value="female" className="radio" onChange={handleChange} checked={formData.gender === "female"} required />
                <span>Female</span>
              </label>

              <label className="flex items-center space-x-2">
                <input type="radio" name="gender" value="other" className="radio" onChange={handleChange} checked={formData.gender === "other"} required />
                <span>Other</span>
              </label>
            </div>
          </div> */}

          <div className="mb-2">
            <label>Gender</label>
            <div className="flex space-x-4">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center">
                  <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} /> <span>{g.charAt(0).toUpperCase() + g.slice(1)}</span>
                </label>
              ))}
            </div>
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>

          <textarea name="address" placeholder="Address" className="textarea textarea-bordered w-full mb-3" onChange={handleChange} required></textarea>
          {errors.address && <p className="text-red-500">{errors.address}</p>}
          
          <button onClick={nextStep} className="btn btn-primary w-full" disabled={Object.keys(errors).length > 0}>
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Emergency Contact</h2>
          <input name="emergencyContact.name" type="text" placeholder="Contact Name" className="input input-bordered w-full mb-2" value={formData.emergencyContact.name} onChange={handleChange} />
          {errors["emergencyContact.name"] && <p className="text-red-500">{errors["emergencyContact.name"]}</p>}

          <input name="emergencyContact.phone" type="number" placeholder="Contact Phone" className="input input-bordered w-full mb-2" value={formData.emergencyContact.phone} onChange={handleChange} maxLength="10" />
          {errors["emergencyContact.phone"] && <p className="text-red-500">{errors["emergencyContact.phone"]}</p>}

          <div className="flex justify-between">
            <button onClick={prevStep} className="btn btn-secondary">Back</button>
            <button onClick={nextStep} className="btn btn-primary" disabled={Object.keys(errors).length > 0}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Medical History & Lifestyle</h2>
          <select name="bloodType" className="select select-bordered w-full mb-2" value={formData.bloodType} onChange={handleChange}>
            <option value="">Select Blood Type</option>
            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.bloodType && <p className="text-red-500">{errors.bloodType}</p>}

          <input name="height" type="number" placeholder="Height (cm)" className="input input-bordered w-full mb-3" value={formData.height} onChange={handleChange} required />
          {errors.height && <p className="text-red-500">{errors.height}</p>}
          
          <input name="weight" type="number" placeholder="Weight (kg)" className="input input-bordered w-full mb-3" value={formData.weight} onChange={handleChange} required />
          {errors.weight && <p className="text-red-500">{errors.weight}</p>} 

          <label className="flex items-center space-x-2 mb-3">
            <input name="smoking" type="checkbox" checked={formData.smoking} onChange={handleCheckboxChange} />
            <span>Smoking</span>
            {errors.smoking && <p className="text-red-500">{errors.smoking}</p>} 
          </label>
          <label className="flex items-center space-x-2 mb-3">
            <input name="alcoholConsumption" type="checkbox" checked={formData.alcoholConsumption} onChange={handleCheckboxChange} />
            <span>Alcohol Consumption</span>
            {errors.alcoholConsumption && <p className="text-red-500">{errors.alcoholConsumption}</p>} 
          </label>

          <button onClick={prevStep} className="btn btn-secondary">Back</button>
          <button onClick={nextStep} className="btn btn-primary" disabled={Object.keys(errors).length > 0}>Next</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Confirm & Submit</h2>
          <p className="mb-4">Review your details before submitting.</p>

          {message && <p className="text-green-500">{message}</p>}

          <div className="flex justify-between">
            <button onClick={prevStep} className="btn btn-secondary">Back</button>
            <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}