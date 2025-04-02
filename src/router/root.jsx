import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import AdminLayout from "../layout/AdminLayout";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Contact from "../pages/user/contact";
import Login from "../pages/admin/Login";
import Signup from "../pages/admin/Signup";
import AdminDashboard from "../pages/admin/adminDashboard";
import AdminPatients from "../pages/admin/AdminPatients";
import AdminDoctors from "../pages/admin/AdminDoctors";
import AdminStaff from "../pages/admin/AdminStaff";
import BloodbankList from "../pages/admin/BloodbankList";
import AppoinmentList from "../pages/admin/AppoinmentList";
import Account from "../pages/admin/Account";
import AccountSettings from "../pages/admin/AccountSettings";
import Error from "../pages/admin/error";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />, 
        children: [
            { path: "/", element: <Home /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "login", element: <Login />},
            { path: "signup", element: <Signup />},
            { path: "error", element: <Error /> }
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
            { path: "settings", element: <AccountSettings /> },
            { path: "error", element: <Error /> }
        ]
    }
]);
