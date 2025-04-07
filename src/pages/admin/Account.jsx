// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { axiosInstance } from '../../config/axiosInstance';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
// import { useNavigate } from 'react-router-dom';

// const Account = () => {
//     const [user, setUser] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         image: "",
//         active: "",
//     });

//     const [loading, setLoading] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const response = await axiosInstance.get("api/admin/profile", {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });

//                 // console.log(response.data.data)

//                 setUser(prev => ({
//                     ...prev,
//                     image: response.data?.data?.profilepic || "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg",
//                     name: response.data?.data?.name || "", 
//                     email: response.data?.data?.email || "", 
//                     phone: response.data?.data?.phone || "",
//                     active: response.data?.data?.isActive || ""
//                 }));

//             } catch (error) {
//                 console.error("Error fetching profile:", error);
//             }
//         };

//         // const updateProfile = async () => {
//         //     try {
//         //         const response = await axiosInstance.put("api/admin/profile-update", user, {
//         //             headers: {
//         //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//         //             },
//         //         });

//         //         console.log(response)
//         //     } catch (error) {
//         //         console.error("Error updating profile:", error);
//         //     }
//         // };

//         fetchProfile();
//         // updateProfile();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUser({
//             ...user,
//             [name]: name === "phone" ? value.replace(/\D/g, "") : value,  // Allow only digits for phone
//         });
//     };
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("name", user.name);
//         formData.append("email", user.email);
//         formData.append("phone", user.phone);

//         if (user.image instanceof File) {
//             formData.append("profilepic", user.image);
//         }

//         try {
//             const response = await axiosInstance.put("api/admin/profile-update", formData, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     "Content-Type": "multipart/form-data",
//                 },
//             });

//             toast.success("Profile updated successfully!");
//             console.log("Profile updated successfully:", response.data);
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Profile update failed!");
//             console.error("Profile update error:", error.response?.data);
//         }
//     };

//     // edit password
//     const [passwords, setPasswords] = useState({
//         password: "",
//         confirmPassword: "",
//     });

//     const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//         setPasswords({
//             ...passwords,
//             [name]: value,
//         });
//     };

//     const handlePasswordUpdate = async (e) => {
//         e.preventDefault();

//         if (!passwords.password || !passwords.confirmPassword) {
//             toast.error("Both password fields are required!");
//             return;
//         }

//         if (passwords.password.length < 6) {
//             toast.error("Password must be at least 6 characters long!");
//             return;
//         }

//         if (passwords.password !== passwords.confirmPassword) {
//             toast.error("Passwords do not match!");
//             return;
//         }

//         try {
//             const response = await axiosInstance.put("api/admin/profile-update", {
//                 password: passwords.password,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });

//             toast.success("Password updated successfully!");
//             console.log("Password update response:", response.data);

//             // Reset password fields
//             setPasswords({ password: "", confirmPassword: "" });
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Password update failed!");
//             console.error("Password update error:", error.response?.data);
//         }
//     };

//     return (
//         <>
//             <div className="tabs tabs-box">
//             {/* <button  className="btn btn-secondary mb-4">← Back</button> */}

//                 <input type="radio" onClick={() => navigate(-1)} name="my_tabs_6" className="btn btn-secondary mb-4" aria-label="← Back"></input>
                
//                 <input type="radio" name="my_tabs_6" className="tab" aria-label="Profile" />
//                 <div className="tab-content bg-base-100 border-base-300 p-6 items-center text-center">
//                     <h2 className="text-xl font-semibold mb-4 text-primary">Profile Details</h2>
//                     <img src={user.image ? user.image : "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg"} alt="Profile Image"  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border border-gray-300" />
//                     <p className="text-base-content"><strong>Name:</strong> {user.name}</p>
//                     <p className="text-base-content"><strong>Email:</strong> {user.email}</p>
//                     <p className="text-base-content"><strong>Phone:</strong> {user.phone}</p>
//                     <p className="text-base-content"><strong>Status:</strong> {user.active ? "Active" : "Inactive"}</p>
//                 </div>
//                 {/* <div className="tab-content bg-base-100 border-base-300 p-6 flex flex-col items-center text-center">
//     <h2 className="text-xl font-semibold mb-4 text-primary">Profile Details</h2>
//     <img 
//         src={user.image ? user.image : "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg"} 
//         alt="Profile Image"  
//         className="w-32 h-32 rounded-full object-cover border border-gray-300 mb-4"
//     />
//     <p className="text-base-content"><strong>Name:</strong> {user.name}</p>
//     <p className="text-base-content"><strong>Email:</strong> {user.email}</p>
//     <p className="text-base-content"><strong>Phone:</strong> {user.phone}</p>
//     <p className="text-base-content"><strong>Status:</strong> {user.active ? "Active" : "Inactive"}</p>
// </div> */}


//                 <input type="radio" name="my_tabs_6" className="tab" aria-label="Edit Profile" defaultChecked />
//                 <div className="tab-content bg-base-100 border-base-300 p-6">
//                     <div className="flex flex-col items-center p-6">
//                         <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl p-6 rounded-lg">
//                             <h2 className="text-xl font-semibold mb-4 text-primary">Edit Profile</h2>
//                             <label className="block mb-2 text-primary">Name</label>
//                             <input type="text" name="name" value={user.name} onChange={handleInputChange} className="input input-bordered w-full mb-4 p-2 border rounded" />
//                             <label className="block mb-2 text-primary">Email</label>
//                             <input type="email" name="email" value={user.email} onChange={handleInputChange} className="input input-bordered w-full mb-4 p-2 border rounded" />
//                             <label className="block mb-2 text-primary">Phone</label>
//                             <input type="number" name="phone" value={user.phone} onChange={handleInputChange} className="input input-bordered w-full mb-4 p-2 border rounded" />
//                             <fieldset className="fieldset mb-2">
//                                 <legend className="fieldset-legend text-primary">Pick a file</legend>
//                                 <input type="file" className="file-input w-full mb-4 p-2 border rounded" name="profilepic" 
//                                     onChange={(e) => {
//                                         const file = e.target.files[0]; 
//                                         if (file) {
//                                             setUser(prev => ({
//                                                 ...prev,
//                                                 image: file // Store actual file instead of preview URL
//                                             }));
//                                         }
//                                     }} />
//                                 <label className="fieldset-label">Max size 2MB</label>
//                             </fieldset>

//                             <button onClick={handleSubmit} disabled={loading} className="btn btn-primary w-full p-2 bg-blue-500 text-white rounded">{loading ? "Saving..." : "Save Changes"}</button>
//                         </div>
//                     </div>
//                 </div>

//                 <input type="radio" name="my_tabs_6" className="tab" aria-label="Edit Password" />
//                 <div className="tab-content bg-base-100 border-base-300 p-6">
//                     <div className="flex flex-col items-center p-6">
//                         <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl p-6 rounded-lg">
//                             <h2 className="text-xl font-semibold mb-4 text-primary">Update Password</h2>
//                             <form onSubmit={handlePasswordUpdate}>
//                                 <label className="block mb-2 text-primary">New Password</label>
//                                 <input type="password" name="password" value={passwords.password} onChange={handlePasswordChange}  className="input input-bordered w-full mb-4 p-2 border rounded" />
//                                 <label className="block mb-2 text-primary">Confirm Password</label>
//                                 <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange}   className="input input-bordered w-full mb-4 p-2 border rounded" />
//                                 <button className="btn btn-error w-full p-2 bg-red-500 text-white rounded" >Update Password</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Toast container */}
//             <ToastContainer />
//         </>
//     );
// }

// export default Account;

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
