import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      if (response.status === 201) {
        toast.success('Registered successfully!');
            // Save user data to localStorage
      const { token, user } = response.data; // adjust according to your backend response
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token); 
        setTimeout(() => {
          navigate('/userdashboard');
        }, 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />  {/* Toast container */}

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Name"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account? 
            <Link to="/signin">
              <p className="text-green-500 hover:underline">Sign In</p>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
