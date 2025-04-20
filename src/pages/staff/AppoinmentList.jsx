import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppoinmentList = () => {

    const [appoinments, setAppoinments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppoinments();
    }, []);

    const fetchAppoinments = async () => {
        try {
            const response = await axiosInstance.get(`/api/staff/appoinment`, {
                params: { search: searchQuery }
            });
    
            const appointments = response.data.data;
    
            const now = new Date();
            const sortedAppointments = appointments.sort((a, b) => {
                const dateTimeA = new Date(`${a.appointmentDate}T${a.appointmentTime}`);
                const dateTimeB = new Date(`${b.appointmentDate}T${b.appointmentTime}`);
    
                const isAFuture = dateTimeA >= now;
                const isBFuture = dateTimeB >= now;
    
                if (isAFuture && !isBFuture) return -1;
                if (!isAFuture && isBFuture) return 1;
    
                return dateTimeA - dateTimeB;
            });
    
            setAppoinments(sortedAppointments);
        } catch (error) {
            console.error("Error fetching Appoinment:", error);
        }
    };
    

    const handleSearch = () => setCurrentPage(1); // Reset to first page on search click

    // const totalPages = Math.ceil(appoinments.length / itemsPerPage);
    // const paginatedData = appoinments.slice(
    //     (currentPage - 1) * itemsPerPage,
    //     currentPage * itemsPerPage
    // );
    // Normalize and filter based on search query
    const filteredAppointments = appoinments.filter((appointment) => {
        const query = searchQuery.toLowerCase();

        const doctorName = appointment.doctorId?.name?.toLowerCase() || "";
        const patientName = appointment.patientId?.name?.toLowerCase() || "";
        const appointmentDate = appointment.appointmentDate.toLowerCase();
        const status = appointment.status.toLowerCase();

        return (
            doctorName.includes(query) ||
            patientName.includes(query) ||
            appointmentDate.includes(query) ||
            status.includes(query)
        );
    });

    // Paginate after filtering
    const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
    const paginatedData = filteredAppointments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                {/* Back navigating button */}
                <button type="radio" onClick={() => navigate(-1)} name="my_tabs_6" className="btn btn-secondary mb-4" >← Back</button>

                <h2 className="text-2xl font-semibold mb-4 text-center text-primary">Appoinment List</h2>

                <div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); // Reset to page 1 on every input
                        }}
                        placeholder="Search by doctor, patient, date, status..."
                        className="input input-bordered w-full md:w-64"
                    />
                </div>

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
                            <th className="p-3">Patient</th>
                            <th className="p-3">Doctor</th>
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
                                <td className="p-3">
                                    {/* {appoinment.appointmentTime} */}
                                    {new Date(`1970-01-01T${appoinment.appointmentTime}`).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}</td>
                                <td className="p-3">
                                    <span className={`font-semibold px-3 py-1 rounded-full text-sm 
                      ${appoinment.status === 'Scheduled' ? 'bg-blue-100 text-blue-600' : appoinment.status === 'Completed' ? 'bg-green-100 text-green-600'
                                            : appoinment.status === 'Cancelled' ? 'bg-red-100 text-red-600' : appoinment.status === 'Rescheduled' ? 'bg-yellow-100 text-yellow-600'
                                                : 'bg-gray-100 text-gray-600'} `} >
                                        {appoinment.status}
                                    </span>
                                </td>
                                <td className="p-3">{appoinment.patientId.name}</td>
                                <td className="p-3">{appoinment.doctorId.name}</td>
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

            <ToastContainer />
        </div>
    );
};

export default AppoinmentList;

