import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Settings() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        roleDescription: '',
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
        const fetchStaffData = async () => {
            try {
                const res = await axiosInstance.get('/api/staff/profile');
                // console.log(res)
                const staff = res.data?.data || {};

                const {
                    name = '',
                    email = '',
                    phone = '',
                    roleDescription = '',
                    image = ''
                } = staff;

                setFormData(prev => ({
                    ...prev,
                    name,
                    email,
                    phone,
                    roleDescription,
                    imageUrl: image || ''
                }));
            } catch (error) {
                toast.error("Failed to load profile data");
            }
        };

        fetchStaffData();
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
        if (!formData.roleDescription) errors.roleDescription = "Role is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleStaffSubmit = async (e) => {
        e.preventDefault();
        if (!validateProfile()) return;

        try {
            const form = new FormData();

            for (const key in formData) {
                if (key === "imageUrl") continue;
                form.append(key, formData[key]);
            }

            await axiosInstance.put('/api/staff/profile-update', form);
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
            await axiosInstance.put('/api/staff/pwd-update', passwordData);
            toast.success("Password updated successfully!");
            setPasswordData({ password: '', confirmPassword: '' });
        } catch (error) {
            toast.error("Error updating password");
        }
    };
    // console.log(formData)
    return (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-5xl mx-auto p-4 text-base-content">

            {/* Profile Update Card */}
            <form onSubmit={handleStaffSubmit} className="card bg-base-100 p-6 shadow-xl space-y-4">
                <h2 className="text-xl font-bold mb-6 text-center">Update Staff Profile</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="form-control">
                        <input
                            name="name"
                            placeholder="Full Name"
                            className="input input-bordered w-full"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="form-control">
                        <input
                            name="phone"
                            type="text"
                            maxLength="10"
                            placeholder="Phone"
                            className="input input-bordered w-full"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                    </div>

                    {/* Role Description */}
                    <div className="form-control">
                        <input
                            name="roleDescription"
                            placeholder="Role Description"
                            className="input input-bordered w-full"
                            value={formData.roleDescription}
                            onChange={handleChange}
                        />
                        {formErrors.roleDescription && <p className="text-red-500 text-sm mt-1">{formErrors.roleDescription}</p>}
                    </div>

                    {/* Profile Picture */}
                    <div className="form-control col-span-2">
                        <label className="label"><span className="label-text">Profile Picture</span></label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input file-input-bordered w-full"
                        />
                        {formData.imageUrl && (
                            <img
                                src={formData.imageUrl}
                                alt="Preview"
                                className="w-32 h-32 mt-2 rounded-full border border-base-300"
                            />
                        )}
                    </div>
                </div>

                <button type="submit" className="btn btn-success w-full mt-4">Update Profile</button>
            </form>

            {/* Password Update Card */}
            <form onSubmit={handlePasswordSubmit} className="card bg-base-100 p-6 shadow-xl space-y-4">
                <h2 className="text-xl font-bold text-center mb-4">Update Password</h2>

                <div className="form-control">
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        className="input input-bordered w-full"
                        value={passwordData.password}
                        onChange={handlePasswordChange}
                    />
                    {passwordErrors.password && <p className="text-red-500 text-sm mt-1">{passwordErrors.password}</p>}
                </div>

                <div className="form-control">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="input input-bordered w-full"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                    />
                    {passwordErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{passwordErrors.confirmPassword}</p>}
                </div>

                <button type="submit" className="btn btn-secondary w-full mt-4">Update Password</button>
            </form>

            <ToastContainer />
        </div>

    );
}
