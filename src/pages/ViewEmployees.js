import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../features/employeeSlice';

const ViewEmployees = () => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Employees</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Department</th>
            <th className="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b">
              <td className="px-4 py-2">{employee.name}</td>
              <td className="px-4 py-2">{employee.department}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEmployees;
