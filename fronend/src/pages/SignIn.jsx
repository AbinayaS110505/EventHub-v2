import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const SignIn = () => {
  const navigate = useNavigate();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  const adminRole = import.meta.env.VITE_ADMIN_ROLE;


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Admin login shortcut
    if (formData.email === adminEmail && formData.password === adminPassword && formData.role === adminRole) {
      toast.success('Admin signed in!');
      navigate('/admindashboard');
      return;  // very important! Stop here
    }
  
    // Normal user login
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
  
      if (response.status === 200) {
        toast.success('Signed in successfully!');
        const { token, user } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
  
        if (formData.role === 'admin') {
          navigate('/admindashboard');
        } else {
          navigate('/userdashboard');
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Sign in failed!';
      toast.error(errorMessage);
    }
  };
  


  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />  {/* Toast container */}

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign In</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
