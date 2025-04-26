import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

const ProfileNav = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const navigate = useNavigate(); // ✅ Setup navigate

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const logout = () => {
    // ✅ Clear user data from localStorage
    localStorage.removeItem('user');
    // ✅ Navigate to Home page
    navigate('/');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserdata(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-purple-700">🎫 EventEase</div>

      {/* Links */}
      <div className="flex gap-6 text-gray-700 font-medium">
        <a href="#home" className="hover:text-purple-600 transition">Home</a>
      </div>

      {/* Profile */}
      <div className="relative">
        <FaUserCircle
          className="text-3xl text-gray-600 cursor-pointer hover:text-purple-600 transition"
          onClick={toggleProfile}
        />

        {/* Profile Popup */}
        {showProfile && userdata && (
          <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 p-4 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-purple-700">👤 {userdata.username}</h3>
              <button onClick={toggleProfile} className="text-sm text-gray-500 hover:text-red-400">✖ Close</button>
            </div>
            <div className="text-gray-700">
              <p><strong>📧 Email:</strong> {userdata.email}</p>
            </div>

            <div className="mt-4 text-center">
              <button 
                onClick={logout} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileNav;
