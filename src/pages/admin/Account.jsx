import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const Account = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        image: "",
        active: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get("api/admin/profile", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                // console.log(response.data.data)

                setUser(prev => ({
                    ...prev,
                    image: response.data?.data?.profilepic || "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg",
                    name: response.data?.data?.name || "", 
                    email: response.data?.data?.email || "", 
                    phone: response.data?.data?.phone || "",
                    active: response.data?.data?.isActive || ""
                }));

            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        // const updateProfile = async () => {
        //     try {
        //         const response = await axiosInstance.put("api/admin/profile-update", user, {
        //             headers: {
        //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
        //             },
        //         });

        //         console.log(response)
        //     } catch (error) {
        //         console.error("Error updating profile:", error);
        //     }
        // };

        fetchProfile();
        // updateProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: name === "phone" ? value.replace(/\D/g, "") : value,  // Allow only digits for phone
        });
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
            const response = await axiosInstance.put("api/admin/profile-update", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Profile updated successfully!");
            console.log("Profile updated successfully:", response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Profile update failed!");
            console.error("Profile update error:", error.response?.data);
        }
    };

    // edit password
    const [passwords, setPasswords] = useState({
        password: "",
        confirmPassword: "",
    });

    const handlePasswordChange = (e) => {
    const { name, value } = e.target;
        setPasswords({
            ...passwords,
            [name]: value,
        });
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if (!passwords.password || !passwords.confirmPassword) {
            toast.error("Both password fields are required!");
            return;
        }

        if (passwords.password.length < 6) {
            toast.error("Password must be at least 6 characters long!");
            return;
        }

        if (passwords.password !== passwords.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const response = await axiosInstance.put("api/admin/profile-update", {
                password: passwords.password,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            toast.success("Password updated successfully!");
            console.log("Password update response:", response.data);

            // Reset password fields
            setPasswords({ password: "", confirmPassword: "" });
        } catch (error) {
            toast.error(error.response?.data?.message || "Password update failed!");
            console.error("Password update error:", error.response?.data);
        }
    };

    return (
        <>
            <div className="tabs tabs-box">
                <input type="radio" name="my_tabs_6" className="tab" aria-label="Profile" />
                <div className="tab-content bg-base-100 border-base-300 p-6 items-center text-center">
                    <h2 className="text-xl font-semibold mb-4 text-primary">Profile Details</h2>
                    <img src={user.image ? user.image : "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg"} alt="Profile Image"  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border border-gray-300" />
                    <p className="text-base-content"><strong>Name:</strong> {user.name}</p>
                    <p className="text-base-content"><strong>Email:</strong> {user.email}</p>
                    <p className="text-base-content"><strong>Phone:</strong> {user.phone}</p>
                    <p className="text-base-content"><strong>Status:</strong> {user.active ? "Active" : "Inactive"}</p>
                </div>
                {/* <div className="tab-content bg-base-100 border-base-300 p-6 flex flex-col items-center text-center">
    <h2 className="text-xl font-semibold mb-4 text-primary">Profile Details</h2>
    <img 
        src={user.image ? user.image : "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg"} 
        alt="Profile Image"  
        className="w-32 h-32 rounded-full object-cover border border-gray-300 mb-4"
    />
    <p className="text-base-content"><strong>Name:</strong> {user.name}</p>
    <p className="text-base-content"><strong>Email:</strong> {user.email}</p>
    <p className="text-base-content"><strong>Phone:</strong> {user.phone}</p>
    <p className="text-base-content"><strong>Status:</strong> {user.active ? "Active" : "Inactive"}</p>
</div> */}


                <input type="radio" name="my_tabs_6" className="tab" aria-label="Edit Profile" defaultChecked />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <div className="flex flex-col items-center p-6">
                        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4 text-primary">Edit Profile</h2>
                            <label className="block mb-2 text-primary">Name</label>
                            <input type="text" name="name" value={user.name} onChange={handleInputChange} className="input input-bordered w-full mb-4 p-2 border rounded" />
                            <label className="block mb-2 text-primary">Email</label>
                            <input type="email" name="email" value={user.email} onChange={handleInputChange} className="input input-bordered w-full mb-4 p-2 border rounded" />
                            <label className="block mb-2 text-primary">Phone</label>
                            <input type="number" name="phone" value={user.phone} onChange={handleInputChange} className="input input-bordered w-full mb-4 p-2 border rounded" />
                            <fieldset className="fieldset mb-2">
                                <legend className="fieldset-legend text-primary">Pick a file</legend>
                                <input type="file" className="file-input w-full mb-4 p-2 border rounded" name="profilepic" 
                                    onChange={(e) => {
                                        const file = e.target.files[0]; 
                                        if (file) {
                                            setUser(prev => ({
                                                ...prev,
                                                image: file // Store actual file instead of preview URL
                                            }));
                                        }
                                    }} />
                                <label className="fieldset-label">Max size 2MB</label>
                            </fieldset>

                            <button onClick={handleSubmit} disabled={loading} className="btn btn-primary w-full p-2 bg-blue-500 text-white rounded">{loading ? "Saving..." : "Save Changes"}</button>
                        </div>
                    </div>
                </div>

                <input type="radio" name="my_tabs_6" className="tab" aria-label="Edit Password" />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <div className="flex flex-col items-center p-6">
                        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4 text-primary">Update Password</h2>
                            <form onSubmit={handlePasswordUpdate}>
                                <label className="block mb-2 text-primary">New Password</label>
                                <input type="password" name="password" value={passwords.password} onChange={handlePasswordChange}  className="input input-bordered w-full mb-4 p-2 border rounded" />
                                <label className="block mb-2 text-primary">Confirm Password</label>
                                <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange}   className="input input-bordered w-full mb-4 p-2 border rounded" />
                                <button className="btn btn-error w-full p-2 bg-red-500 text-white rounded" >Update Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast container */}
            <ToastContainer />
        </>
    );
}

export default Account;
