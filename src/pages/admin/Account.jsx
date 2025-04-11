import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Account = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        image: null,
        active: "",
    });

    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState('view');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get("api/admin/profile", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                setUser({
                    name: response.data?.data?.name || "",
                    email: response.data?.data?.email || "",
                    phone: response.data?.data?.phone || "",
                    image: response.data?.data?.profilepic || null,
                    active: response.data?.data?.isActive || "",
                });

            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: name === "phone" ? value.replace(/\D/g, "") : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("phone", user.phone);

        if (user.image instanceof File) {
            formData.append("profilepic", user.image);
        }

        try {
            setLoading(true);
            await axiosInstance.put("api/admin/profile-update", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Profile update failed!");
        } finally {
            setLoading(false);
        }
    };

    const [passwords, setPasswords] = useState({
        password: "",
        confirmPassword: "",
    });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        const { password, confirmPassword } = passwords;

        if (!password || !confirmPassword) {
            toast.error("Both password fields are required!");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            await axiosInstance.put("api/admin/profile-update", {
                password,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            toast.success("Password updated successfully!");
            setPasswords({ password: "", confirmPassword: "" });
        } catch (error) {
            toast.error(error.response?.data?.message || "Password update failed!");
        }
    };

    const getImageUrl = () => {
        if (user.image instanceof File) {
            return URL.createObjectURL(user.image);
        }
        return user.image || "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg";
    };

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Tabs */}
            <div className="flex justify-center mb-6">
                <div className="btn-group">
                    <button onClick={() => setTab('view')} className={`btn ${tab === 'view' && 'btn-active'}`}>Profile</button>
                    <button onClick={() => setTab('edit')} className={`btn ${tab === 'edit' && 'btn-active'}`}>Edit Profile</button>
                    <button onClick={() => setTab('password')} className={`btn ${tab === 'password' && 'btn-active'}`}>Change Password</button>
                    <button onClick={() => navigate(-1)} className="btn btn-outline">← Back</button>
                </div>
            </div>

            {/* View Profile */}
            {tab === 'view' && (
                <div className="max-w-xl mx-auto bg-base-200 p-6 rounded-xl shadow-md text-center">
                    <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
                    <img
                        src={getImageUrl()}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border shadow"
                    />
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Status:</strong> {user.active ? "Active" : "Inactive"}</p>
                </div>
            )}

            {/* Edit Profile */}
            {tab === 'edit' && (
                <div className="max-w-xl mx-auto bg-base-200 p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" value={user.name} onChange={handleInputChange} placeholder="Name" className="input input-bordered w-full mb-4" />
                        <input type="email" name="email" value={user.email} onChange={handleInputChange} placeholder="Email" className="input input-bordered w-full mb-4" />
                        <input type="number" name="phone" value={user.phone} onChange={handleInputChange} placeholder="Phone" className="input input-bordered w-full mb-4" />
                        <input type="file" accept="image/*" onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setUser((prev) => ({ ...prev, image: file }));
                            }
                        }} className="file-input file-input-bordered w-full mb-4" />
                        <button type="submit" disabled={loading} className="btn btn-primary w-full">{loading ? "Saving..." : "Save Changes"}</button>
                    </form>
                </div>
            )}

            {/* Change Password */}
            {tab === 'password' && (
                <div className="max-w-xl mx-auto bg-base-200 p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                    <form onSubmit={handlePasswordUpdate}>
                        <input type="password" name="password" value={passwords.password} onChange={handlePasswordChange} placeholder="New Password" className="input input-bordered w-full mb-4" />
                        <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} placeholder="Confirm Password" className="input input-bordered w-full mb-4" />
                        <button type="submit" className="btn btn-error w-full">Update Password</button>
                    </form>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default Account;
