import React from 'react'
import { Link } from "react-router-dom";
import Account from './Account';
import EditProfile from './EditProfile';
import UpdatePassword from './UpdatePassword';

const AccountSettings = () => {
  return (
      <div className="flex flex-col items-center p-6 gap-4">
        <nav className="flex gap-4">
          <Link to="account" className="btn btn-outline p-2 border rounded">Profile</Link>
          <Link to="edit-profile" className="btn btn-outline p-2 border rounded">Edit Profile</Link>
          <Link to="update-password" className="btn btn-outline p-2 border rounded">Update Password</Link>
        </nav>
      </div>
  )
}

export default AccountSettings
