import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserData } from "../../hooks/useUserData";

const AppoinmentList = () => {

    const [appoinments, setAppoinments] = useState([]);
    const [RequestAppoinmentId, setRequestAppoinmentId] = useState();
    const [isScheduled, setIsScheduled] = useState(false);
    const [deleteAppoinmentId, setDeleteAppoinmentId] = useState(null);
    const { userData } = useUserData();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppoinments();
    }, []);

    const fetchAppoinments = async () => {
        try {
            const response = await axiosInstance.get("/api/patient/appoinment-list");
            //   console.log(response)
            setAppoinments(response.data.data);
            setIsScheduled(response.data.scheduled);
        } catch (error) {
            console.error("Error fetching Appoinment:", error);
        }
    };

    const requestAppointment = async () => {
        try {
            await axiosInstance.put("/api/patient/request");
            toast.success("Appointment request sent!");
            fetchAppoinments();
        } catch (error) {
            toast.error("Error sending request!");
            console.error("Error requesting appointment:", error);
        } finally {
            setRequestAppoinmentId(null);
        }
    };

    const cancelAppoinment = async () => {
        try {
            await axiosInstance.delete(`/api/patient/cancel/${deleteAppoinmentId}`);
            toast.success("Appointment cancelled!");
            fetchAppoinments();
        } catch (error) {
            toast.error("Error cancelling appointment!");
            console.error("Error cancelling appointment:", error);
        } finally {
            setDeleteAppoinmentId(null);
        }
    };

    // Pagination logic
    const totalPages = Math.ceil(appoinments.length / itemsPerPage);
    const paginatedData = appoinments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    // console.log(appoinments)

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                {/* Back navigating button */}
                <button
                    type="radio"
                    onClick={() => navigate(-1)}
                    name="my_tabs_6"
                    className="btn btn-secondary w-full md:w-auto"
                >
                    ← Back
                </button>

                <h2 className="text-xl md:text-2xl font-semibold text-center text-primary">
                    Appointment List
                </h2>

                <button
                    className="btn btn-primary w-full md:w-auto"
                    onClick={() => navigate(`/patient/request/${userData?._id}`)}
                >
                    Book New Appointment
                </button>
            </div>


            {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
            <div className="overflow-x-auto rounded-lg border border-base-content/10 bg-base-100 shadow-lg">
                <table className="table w-full">
                    <thead className="bg-primary text-primary-content">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Appoinment Date</th>
                            <th className="p-3">Appointment Time</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Doctor</th>
                            <th className="p-3">Consultation Notes</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-300">
                        {paginatedData.map((appoinment, index) => (
                            <tr
                                key={appoinment._id}
                                className="hover:bg-base-200 transition duration-200"
                            >
                                <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td className="p-3">{appoinment.appointmentDate}</td>
                                <td className="p-3">{appoinment.appointmentTime}</td>
                                <td className="p-3">
                                    <span className={`font-semibold px-3 py-1 rounded-full text-sm 
                      ${appoinment.status === 'Scheduled' ? 'bg-blue-100 text-blue-600' : appoinment.status === 'Completed' ? 'bg-green-100 text-green-600'
                                            : appoinment.status === 'Cancelled' ? 'bg-red-100 text-red-600' : appoinment.status === 'Rescheduled' ? 'bg-yellow-100 text-yellow-600'
                                                : 'bg-gray-100 text-gray-600'} `} >
                                        {appoinment.status}
                                    </span>
                                </td>
                                <td className="p-3">{appoinment.doctorId.name}</td>
                                <td className="p-3">{appoinment.consultationNotes}</td>
                                <td className="p-3 flex space-x-2">
                                    {/* <button className="btn btn-sm btn-warning" onClick={() => setRequestAppoinmentId(appoinment._id)} disabled={isScheduled}>Request</button> */}
                                    <button className="btn btn-sm btn-error" onClick={() => setDeleteAppoinmentId(appoinment._id)}>Cancel</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <div className="join">
                    <button className="join-item btn" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} > « </button>
                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                            <button key={index} className={`join-item btn ${currentPage === page ? "btn-primary" : ""}`} onClick={() => setCurrentPage(page)} >{page}</button>
                        );
                    })}

                    <button
                        className="join-item btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        »
                    </button>
                </div>
            </div>

            {/* Request Confirmation Modal */}
            {RequestAppoinmentId && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">Confirm Request</h3>
                        <p className="py-4">Are you sure you want to request this appointment?</p>
                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={requestAppointment}>Yes, Request</button>
                            <button className="btn" onClick={() => setRequestAppoinmentId(null)}>No</button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setRequestAppoinmentId(null)}></div>
                </div>
            )}


            {/* Cancel Confirmation Modal */}
            {deleteAppoinmentId && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">Confirm Cancel Appointment</h3>
                        <p className="py-4">Are you sure you want to cancel this appointment?</p>
                        <div className="modal-action">
                            <button className="btn btn-error" onClick={cancelAppoinment}>Yes, Cancel</button>
                            <button className="btn" onClick={() => setDeleteAppoinmentId(null)}>No</button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setDeleteAppoinmentId(null)} ></div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default AppoinmentList;

