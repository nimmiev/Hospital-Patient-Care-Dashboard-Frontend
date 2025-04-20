import { createBrowserRouter } from "react-router-dom"
import RootLayout from "../layout/RootLayout"
import AdminLayout from "../layout/AdminLayout"
import Home from "../pages/user/Home"
import About from "../pages/user/About"
import Contact from "../pages/user/Contact"
import Login from "../pages/admin/Login"
import Signup from "../pages/admin/Signup"
import AdminDashboard from "../pages/admin/AdminDashboard"
import AdminPatients from "../pages/admin/AdminPatients"
import AdminDoctors from "../pages/admin/AdminDoctors"
import AdminStaff from "../pages/admin/AdminStaff"
import BloodbankList from "../pages/admin/BloodbankList"
import AppoinmentList from "../pages/admin/AppoinmentList"
import Account from "../pages/admin/Account"
import Error from "../pages/error"
import PatientDetails from "../pages/admin/PatientDetails"
import AddPatient from "../pages/admin/AddPatient"
import PatientDashboard from "../pages/patient/Dashboard"
import StaffDashboard from "../pages/staff/Dashboard"
import DoctorDashboard from "../pages/doctor/Dashboard"
import Terms from "../pages/user/Terms"
import Privacy from "../pages/user/Privacy"
import DoctorDetails from "../pages/admin/DoctorDetails"
import StaffDetails from "../pages/admin/StaffDetails"
import UpdateBloodbank from "../pages/admin/UpdateBloodbank"
import AddBloodbank from "../pages/admin/AddBloodbank"
import ScheduleAppoinment from "../pages/admin/AddAppoinment"
import RescheduleAppoinment from "../pages/admin/RescheduleAppoinment"
import StaffTasks from "../pages/admin/StaffTaskList"
import AddTask from "../pages/admin/AddTask"
import UpdateTask from "../pages/admin/UpdateTask"
import PatientProfile from "../pages/patient/Profile"
import PatientStetting from "../pages/patient/Settings"
import PatientAppoinment from "../pages/patient/AppoinmentList"
import PatientBloodbank from "../pages/patient/BloodbankList"
import DoctorProfile from "../pages/doctor/Profile"
import DoctorStetting from "../pages/doctor/Settings"
import DoctorAppoinment from "../pages/doctor/AppoinmentList"
import Instructions from "../pages/admin/InstructionList"
import DoctorPatients from "../pages/doctor/PatientList"
import DoctorPatientDetails from "../pages/doctor/PatientDetails"
import StaffProfile from "../pages/staff/Profile"
import StaffStetting from "../pages/staff/Settings"
import StaffAppoinment from "../pages/staff/AppoinmentList"
import StaffBloodbank from "../pages/staff/BloodbankList"
import StaffPatients from "../pages/staff/PatientList"
import StaffTaskLists from "../pages/staff/TaskList"
import StaffAddPatients from "../pages/staff/AddPatient"

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
            { path: "doctor", element: <DoctorDashboard />},
            { path: "patient/profile", element: < PatientProfile/>},
            { path: "patient/settings", element: < PatientStetting/>},
            { path: "patient/appoinments", element: < PatientAppoinment/>},
            { path: "patient/bloodbanks", element: < PatientBloodbank/>},
            { path: "doctor/profile", element: < DoctorProfile/>},
            { path: "doctor/settings", element: < DoctorStetting/>},
            { path: "doctor/appoinments", element: < DoctorAppoinment/>},
            { path: "doctor/patients", element: < DoctorPatients/>},
            { path: "doctor/:id", element: < DoctorPatientDetails/>},
            { path: "staff/profile", element: < StaffProfile/>},
            { path: "staff/settings", element: < StaffStetting/>},
            { path: "staff/appoinments", element: < StaffAppoinment/>},
            { path: "staff/bloodbanks", element: < StaffBloodbank/>},
            { path: "staff/patients", element: < StaffPatients/>},
            { path: "staff/tasks", element: < StaffTaskLists/>},
            { path: "staff/addPatient", element: < StaffAddPatients />}          
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
            { path: "editTask/:taskId",element: <UpdateTask />},
            { path: "instruction", element: <Instructions />}
        ]
    }
]);
