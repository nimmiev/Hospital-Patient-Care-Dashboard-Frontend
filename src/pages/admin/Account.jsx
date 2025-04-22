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
    const [admins, setAdmins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
        fetchAdmins();
    }, []);

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
                isSuperAdmin: response.data?.data?.isSuperAdmin || "",
            });

        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

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

    const fetchAdmins = async () => {
        try {
            const response = await axiosInstance.get("api/admin/adminlist", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            // console.log(response)
            setAdmins(response.data.data);

        } catch (error) {
            console.error("Error fetching admins:", error);
        }
    };

    // Pagination logic
    const totalPages = Math.ceil(admins.length / itemsPerPage);
    const paginatedData = admins.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Tabs */}
            <div className="flex justify-center mb-6">
                <div className="btn-group">
                    <button onClick={() => setTab('view')} className={`btn ${tab === 'view' && 'btn-active'}`}>Profile</button>
                    <button onClick={() => setTab('edit')} className={`btn ${tab === 'edit' && 'btn-active'}`}>Edit Profile</button>
                    <button onClick={() => setTab('password')} className={`btn ${tab === 'password' && 'btn-active'}`}>Change Password</button>
                    {user.isSuperAdmin && (
                        <button onClick={() => setTab('admin')} className={`btn ${tab === 'admin' && 'btn-active'}`}>
                            Admin List
                        </button>
                    )}
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

            {/* Admin List */}
            {tab === 'admin' && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <div></div>

                        <h2 className="text-2xl font-semibold mb-4 text-center text-primary">Admin List</h2>

                        {/* Back navigating button */}
                        <button type="button" className="btn btn-primary mb-4" onClick={() => navigate("/admin/addAdmin")}>+ Add Admin</button>

                    </div>

                    <div className="overflow-x-auto rounded-lg border border-base-content/10 bg-base-100 shadow-lg">
                        <table className="table w-full">
                            <thead className="bg-primary text-primary-content">
                                <tr>
                                    <th className="p-3">#</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">phone</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-300">
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((admin, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-base-200 transition duration-200"
                                        >
                                            <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td className="p-3">{admin.name}</td>
                                            <td className="p-3">{admin.email}</td>
                                            <td className="p-3">{admin.phone}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4 text-gray-500">No messages found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        <div className="join">
                            <button
                                className="join-item btn"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                «
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    className={`join-item btn ${currentPage === index + 1 ? "btn-primary" : ""}`}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                className="join-item btn"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                »
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default Account;
