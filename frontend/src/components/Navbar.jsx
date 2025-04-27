import React from 'react'
import Logo from '../assets/img/event-logo.jpg';
import { Link } from 'react-router-dom'; 
const Navbar = () => {
  return (
        <div>
         <nav className="bg-white shadow py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center">
            <img src={Logo} alt="EventHub Logo" className="h-8 mr-2" />
            <span className="font-semibold text-xl text-indigo-600">EventHub</span>
          </div>
          <div className="hidden md:flex space-x-6">
          
            <Link
              to="/signup"
              className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign Up
            </Link>
           
            <Link
              to="/signIn" 
              className="text-indigo-600 font-semibold hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Log In
            </Link>
          </div>
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              ☰
            </button>
          </div>
        </div>
      </nav>
      
    </div>
  )
}

export default Navbar
