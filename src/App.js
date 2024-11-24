import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ViewEmployees from './pages/ViewEmployees';
import AddEmployee from './pages/AddEmployee';
import ViewProfile from './pages/ViewProfile';
import UpdateProfile from './pages/UpdateProfile';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin', 'employee']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-employees"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ViewEmployees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-profile"
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <ViewProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-profile"
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
};

export default App;
