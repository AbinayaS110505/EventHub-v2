import React, { useState } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  

const AdminNav = ({ adminName = 'Admin', totalEvents = 0 }) => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();  

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    alert('Logged out!');
    setShowProfile(false);
    navigate('/');  
  };

  return (
    <div className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
    
      <div className="text-2xl font-bold text-blue-700"> AdminPanel</div>

      <div className="flex gap-6 text-gray-700 font-medium">
        <a href="#dashboard" className="hover:text-blue-600 transition">Dashboard</a>
      </div>

      <div className="relative">
        <FaUserTie
          className="text-3xl text-gray-600 cursor-pointer hover:text-blue-600 transition"
          onClick={toggleProfile}
        />

        {showProfile && (
          <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 p-4 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-700">👔 {adminName}</h3>
              <button onClick={toggleProfile} className="text-sm text-gray-500 hover:text-red-400">✖ Close</button>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
              >
                🔓 Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNav;
