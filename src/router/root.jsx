import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import AdminLayout from "../layout/AdminLayout";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Contact from "../pages/user/Contact";
import Login from "../pages/admin/Login";
import Signup from "../pages/admin/Signup";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminPatients from "../pages/admin/AdminPatients";
import AdminDoctors from "../pages/admin/AdminDoctors";
import AdminStaff from "../pages/admin/AdminStaff";
import BloodbankList from "../pages/admin/BloodbankList";
import AppoinmentList from "../pages/admin/AppoinmentList";
import Account from "../pages/admin/Account";
import Error from "../pages/admin/error";
import PatientDetails from "../pages/admin/PatientDetails";
import AddPatient from "../pages/admin/AddPatient";
import PatientDashboard from "../pages/patient/Dashboard";
import StaffDashboard from "../pages/staff/Dashboard";
import DoctorDashboard from "../pages/doctor/Dashboard";
import Terms from "../pages/user/Terms";
import Privacy from "../pages/user/Privacy";
import DoctorDetails from "../pages/admin/DoctorDetails";
import StaffDetails from "../pages/admin/StaffDetails";
import UpdateBloodbank from "../pages/admin/UpdateBloodbank";
import AddBloodbank from "../pages/admin/AddBloodbank";
import ScheduleAppoinment from "../pages/admin/AddAppoinment";
import RescheduleAppoinment from "../pages/admin/RescheduleAppoinment";
import StaffTasks from "../pages/admin/StaffTaskList";
import AddTask from "../pages/admin/AddTask";
import UpdateTask from "../pages/admin/UpdateTask";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />, 
        children: [
            { path: "/", element: <Home /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "terms", element: <Terms />},
            { path: "privacy", element: <Privacy />},
            { path: "login", element: <Login />},
            { path: "signup", element: <Signup />},
            { path: "error", element: <Error /> },
            { path: "patient", element: <PatientDashboard />},
            { path: "staff", element: <StaffDashboard />},
            { path: "doctor", element: <DoctorDashboard />}
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />, 
        children: [
            { index: true, element: <AdminDashboard /> },
            { path: "patients", element: <AdminPatients /> },
            { path: "doctors", element: <AdminDoctors /> },
            { path: "staff", element: <AdminStaff /> },
            { path: "bloodbank", element: <BloodbankList /> },
            { path: "appoinments", element: <AppoinmentList /> },
            { path: "account", element: <Account /> },
            { path: "error", element: <Error /> },
            { path: "patient/:id", element: <PatientDetails /> },
            { path: "patient/add-patient", element: <AddPatient /> },
            { path: "doctor/:id", element: <DoctorDetails /> },
            { path: "staff/:id", element: <StaffDetails /> },
            { path: "bloodbank/:id", element: <UpdateBloodbank />},
            { path: "bloodbank/add-bloodbank", element: <AddBloodbank />},
            { path: "schedule/:id", element: <ScheduleAppoinment />},
            { path: "reschedule/:appoinmentId", element: <RescheduleAppoinment />},            
            { path: "task", element: <StaffTasks />},
            { path: "addTask/:staffId",element: <AddTask />},
            { path: "editTask/:taskId",element: <UpdateTask />}
        ]
    }
]);
