import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createUserAndEmployee } from '../features/employeeSlice';

const AddEmployee = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.employee);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(createUserAndEmployee(data));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add Employee</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">User Info</h3>
              <input
                {...register('name')}
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                {...register('email')}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 mt-2"
                required
              />
              <input
                {...register('password')}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 mt-2"
                required
              />
              <select
                {...register('role')}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 mt-2"
                required
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Employee Info</h3>
              <input
                {...register('department')}
                type="text"
                placeholder="Department"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                {...register('manager')}
                type="text"
                placeholder="Manager"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 mt-2"
                required
              />
              <input
                {...register('performanceScore')}
                type="number"
                placeholder="Performance Score"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 mt-2"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Employee'}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
