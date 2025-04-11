import { useState } from "react";
import {
  FaUserMd,
  FaUserInjured,
  FaUserNurse,
  FaCalendarAlt,
  FaNotesMedical,
  FaSignOutAlt,
  FaEdit,
} from "react-icons/fa";

export default function SidebarDrawer({ }) {
  const [profileEditMode, setProfileEditMode] = useState(false);

  const user = {
    name: "Nimmi",
    role: "patient", // "doctor" or "staff"
    email: "nimmi@example.com",
    avatar: "https://i.pravatar.cc/100"
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-6">
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
        {/* Main content goes here */}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Profile Section */}
          <div className="mb-4 text-center">
            <div className="avatar">
              <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
                <img src={user.avatar} alt="User Avatar" />
              </div>
            </div>
            {/* {!profileEditMode ? ( */}
              <>
                <h2 className="text-lg font-semibold mt-2">{user.name}</h2>
                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
                {/* <button
                  className="btn btn-sm btn-outline mt-2"
                  onClick={() => setProfileEditMode(true)}
                >
                  <FaEdit className="mr-1" /> Edit Profile
                </button> */}
              </>
            {/* // ) : (
            //   <>
            //     <input type="text" defaultValue={user.name} className="input input-sm mt-2 w-full" />
            //     <input type="email" defaultValue={user.email} className="input input-sm mt-2 w-full" />
            //     <div className="flex justify-center gap-2 mt-2">
            //       <button className="btn btn-sm btn-primary">Save</button>
            //       <button
            //         className="btn btn-sm btn-outline"
            //         onClick={() => setProfileEditMode(false)}
            //       >
            //         Cancel
            //       </button>
            //     </div>
            //   </>
            // )} */}
          </div>

          {/* Patient Section */}
          {user.role === "patient" && (
            <>
              {/* <li className="menu-title text-primary">Patient Section</li> */}
              <li>
                <a className="hover:bg-primary hover:text-white">
                  <FaUserInjured className="mr-2" /> My Profile
                </a>
              </li>
              <li>
                <a className="hover:bg-primary hover:text-white">
                  <FaCalendarAlt className="mr-2" /> My Appointments
                </a>
              </li>
              <li>
                <a className="hover:bg-primary hover:text-white">
                  <FaNotesMedical className="mr-2" /> Medical Records
                </a>
              </li>
            </>
          )}

          {/* Doctor Section */}
          {user.role === "doctor" && (
            <>
              {/* <li className="menu-title text-primary">Doctor Section</li> */}
              <li>
                <a className="hover:bg-primary hover:text-white">
                  <FaUserMd className="mr-2" /> Dashboard
                </a>
              </li>
              <li>
                <a className="hover:bg-primary hover:text-white">
                  <FaCalendarAlt className="mr-2" /> Appointments
                </a>
              </li>
              <li>
                <a className="hover:bg-primary hover:text-white">
                  <FaNotesMedical className="mr-2" /> Patient Reports
                </a>
              </li>
            </>
          )}

          {/* Staff Section */}
          {user.role === "staff" && (
            <>
              {/* <li className="menu-title text-primary">Staff Section</li> */}
              <li>
                <a className="hover:bg-primary hover:text-white">
                  <FaUserNurse className="mr-2" /> Manage Patients
                </a>
              </li>
              <li>
                <a className="hover:bg-primary hover:text-white">
                  <FaCalendarAlt className="mr-2" /> Appointment Schedule
                </a>
              </li>
              <li>
                <a className="hover:bg-primary hover:text-white">
                  <FaNotesMedical className="mr-2" /> Hospital Records
                </a>
              </li>
            </>
          )}

          <li className="mt-4">
            <a className="text-red-500 hover:bg-red-100 hover:text-red-700">
              <FaSignOutAlt className="mr-2" /> Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
