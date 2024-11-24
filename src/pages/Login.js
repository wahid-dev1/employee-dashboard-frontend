import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginUser } from '../features/authSlice';
import {Navigate} from 'react-router-dom'
const Login = () => {
  const dispatch = useDispatch();
  const { loading, error,isAuthenticated } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };
 
  if (isAuthenticated) {
    console.log("Authent")
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
