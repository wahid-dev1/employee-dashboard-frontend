import React from 'react';
import { useSelector } from 'react-redux';
import { Link,Navigate } from 'react-router-dom';
import { logout } from '../features/authSlice';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">Employee Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name || 'User'}!</h2>
          <p>You are logged in as <strong>{user?.role || 'unknown'}</strong>.</p>
        </div>

        {/* Navigation Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Admin Navigation */}
          {user?.role === 'admin' && (
            <>
              <Link to="/view-employees" className="bg-white p-6 shadow-md rounded-md hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">View Employees</h3>
                <p className="text-gray-600">View a list of all employees.</p>
              </Link>
              <Link to="/add-employee" className="bg-white p-6 shadow-md rounded-md hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">Add Employee</h3>
                <p className="text-gray-600">Add new employees to the system.</p>
              </Link>
            </>
          )}

          {/* Employee Navigation */}
          {user?.role === 'employee' && (
            <>
              <Link to="/view-profile" className="bg-white p-6 shadow-md rounded-md hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">View Profile</h3>
                <p className="text-gray-600">View your personal profile.</p>
              </Link>
              <Link to="/update-profile" className="bg-white p-6 shadow-md rounded-md hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">Update Profile</h3>
                <p className="text-gray-600">Update your profile information.</p>
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
