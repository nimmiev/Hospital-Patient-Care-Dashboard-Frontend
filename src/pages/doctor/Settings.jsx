import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Settings() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        medicalLicense: '',
        qualification: '',
        experience: '',
        department: '',
        image: null,
        imageUrl: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [passwordData, setPasswordData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [passwordErrors, setPasswordErrors] = useState({});

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const res = await axiosInstance.get('/api/doctor/profile');
                const doctor = res.data?.data || {};

                const {
                    name = '',
                    email = '',
                    phone = '',
                    medicalLicense = '',
                    qualification = '',
                    experience = '',
                    department = '',
                    image = ''
                } = doctor;

                setFormData(prev => ({
                    ...prev,
                    name,
                    email,
                    phone,
                    medicalLicense,
                    qualification,
                    experience,
                    department,
                    imageUrl: image || ''
                }));
            } catch (error) {
                toast.error("Failed to load profile data");
            }
        };

        fetchDoctorData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateProfile = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.email) errors.email = "Email is required";
        if (!formData.phone) errors.phone = "Phone is required";
        if (!formData.medicalLicense) errors.medicalLicense = "License is required";
        if (!formData.qualification) errors.qualification = "Qualification is required";
        if (!formData.experience) errors.experience = "Experience is required";
        if (!formData.department) errors.department = "Department is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleDoctorSubmit = async (e) => {
        e.preventDefault();
        if (!validateProfile()) return;

        try {
            const form = new FormData();
            for (const key in formData) {
                if (key === "imageUrl") continue;
                form.append(key, formData[key]);
            }

            await axiosInstance.put('/api/doctor/profile-update', form);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Error updating profile");
        }
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const validatePassword = () => {
        const errors = {};
        if (!passwordData.password || passwordData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        if (passwordData.password !== passwordData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setPasswordErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword()) return;

        try {
            await axiosInstance.put('/api/doctor/pwd-update', passwordData);
            toast.success("Password updated successfully!");
            setPasswordData({ password: '', confirmPassword: '' });
        } catch (error) {
            toast.error("Error updating password");
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-5xl mx-auto p-4">
            {/* Profile Update Card */}
            <form onSubmit={handleDoctorSubmit} className="card bg-base-100 p-6 shadow-xl space-y-4">
                <h2 className="text-xl font-bold mb-6 text-center text-primary">Update Doctor Profile</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <input name="name" placeholder="Full Name" className="input input-bordered w-full" value={formData.name} onChange={handleChange} />
                        {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                    </div>
                    <div>
                        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" value={formData.email} onChange={handleChange} />
                        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                    </div>
                    <div>
                        <input name="phone" type="text" maxLength="10" placeholder="Phone" className="input input-bordered w-full" value={formData.phone} onChange={handleChange} />
                        {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                    </div>
                    <div>
                        <input name="medicalLicense" placeholder="Medical License" className="input input-bordered w-full" value={formData.medicalLicense} onChange={handleChange} />
                        {formErrors.medicalLicense && <p className="text-red-500 text-sm">{formErrors.medicalLicense}</p>}
                    </div>
                    <div>
                        <input name="qualification" placeholder="Qualification" className="input input-bordered w-full" value={formData.qualification} onChange={handleChange} />
                        {formErrors.qualification && <p className="text-red-500 text-sm">{formErrors.qualification}</p>}
                    </div>
                    <div>
                        <input name="experience" placeholder="Experience" className="input input-bordered w-full" value={formData.experience} onChange={handleChange} />
                        {formErrors.experience && <p className="text-red-500 text-sm">{formErrors.experience}</p>}
                    </div>
                    <div>
                        <input name="department" placeholder="Department" className="input input-bordered w-full" value={formData.department} onChange={handleChange} />
                        {formErrors.department && <p className="text-red-500 text-sm">{formErrors.department}</p>}
                    </div>

                    <div className="col-span-2">
                        <label className="font-medium">Profile Picture</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full" />
                        {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 mt-2 rounded-full" />}
                    </div>
                </div>

                <button type="submit" className="btn btn-success w-full">Update Profile</button>
            </form>

            {/* Password Update Card */}
            <form onSubmit={handlePasswordSubmit} className="card bg-base-100 p-6 shadow-xl space-y-4">
                <h2 className="text-xl font-bold text-center text-primary">Update Password</h2>

                <div>
                    <input type="password" name="password" placeholder="New Password" className="input input-bordered w-full" value={passwordData.password} onChange={handlePasswordChange} />
                    {passwordErrors.password && <p className="text-red-500 text-sm">{passwordErrors.password}</p>}
                </div>

                <div>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input input-bordered w-full" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
                    {passwordErrors.confirmPassword && <p className="text-red-500 text-sm">{passwordErrors.confirmPassword}</p>}
                </div>

                <button type="submit" className="btn btn-secondary mt-4 w-full">Update Password</button>
            </form>

            <ToastContainer />
        </div>
    );
}

