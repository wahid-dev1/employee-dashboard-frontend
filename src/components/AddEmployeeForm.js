import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addEmployeeProfile } from '../features/employeeSlice';

const AddEmployeeForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.employee);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    dispatch(addEmployeeProfile(data))
      .unwrap()
      .then(() => {
        alert('Employee profile added successfully');
        reset();
      })
      .catch(() => {});
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Add Employee Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">User ID</label>
          <input
            type="number"
            {...register('userId', { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Department</label>
          <input
            type="text"
            {...register('department', { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Manager</label>
          <input
            type="text"
            {...register('manager', { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Performance Score</label>
          <input
            type="number"
            {...register('performanceScore', { required: true })}
            step="0.1"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          {loading ? 'Adding...' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
