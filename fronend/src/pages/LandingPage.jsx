import React from 'react';
import { Link,useNavigate } from 'react-router-dom'; // Import Link
import HeroImage from '../assets/img/LandingPage.jpg';
import CalendarIcon from '../assets/img/calander feature.svg';
import GuestsIcon from '../assets/img/guest.svg';
import TicketsIcon from '../assets/img/tickets.svg';
import CommunicationIcon from '../assets/img/communication.svg';

import Navbar from '../components/Navbar';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
    <Navbar />
<div className="bg-gray-50 font-sans antialiased">


<section className="bg-indigo-100 py-20">
  <div className="container mx-auto flex md:flex-row flex-col items-center justify-between px-4">
    <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
      <h1 className="text-4xl font-bold text-indigo-800 mb-4">
        Plan Events Effortlessly with EventHub AI
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        From intimate gatherings to grand celebrations, EventHub empowers you with AI-driven tools to create memorable experiences.
      </p>
      {/* Use Link for navigation */}
      <Link
        to="/signup" // Target path for signup
        className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Get Started for Free
      </Link>
    </div>
    <div className="md:w-1/2">
      <img src={HeroImage} alt="Event Planning Illustration" className="rounded-lg shadow-lg" />
    </div>
  </div>
</section>

<div className="py-16 bg-white" id="#features">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-semibold text-gray-800 mb-8">Effortless Event Planning, Powered by AI</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-8 px-4 md:px-0">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="flex items-center justify-center h-12 w-12 mx-auto bg-indigo-100 text-indigo-600 rounded-full mb-4">
          <img src={CalendarIcon} alt="Smart Scheduling Icon" className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Scheduling</h3>
        <p className="text-gray-600">Let AI suggest the best dates based on guest availability.</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="flex items-center justify-center h-12 w-12 mx-auto bg-indigo-100 text-indigo-600 rounded-full mb-4">
          <img src={GuestsIcon} alt="Seamless Guest Management Icon" className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Seamless Guest Management</h3>
        <p className="text-gray-600">Easily invite guests, track RSVPs, and send updates.</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="flex items-center justify-center h-12 w-12 mx-auto bg-indigo-100 text-indigo-600 rounded-full mb-4">
          <img src={TicketsIcon} alt="Integrated Ticket Booking Icon" className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Integrated Ticket Booking</h3>
        <p className="text-gray-600">Manage free or paid tickets with real-time availability.</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="flex items-center justify-center h-12 w-12 mx-auto bg-indigo-100 text-indigo-600 rounded-full mb-4">
          <img src={CommunicationIcon} alt="Direct Communication Icon" className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Direct Communication</h3>
        <p className="text-gray-600">Stay connected with guests through built-in messaging.</p>
      </div>
    </div>
  </div>
</div>

<section className="bg-indigo-50 py-16" id="#contact">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-semibold text-indigo-800 mb-6">Ready to Simplify Your Event Planning?</h2>
    <p className="text-lg text-gray-700 mb-8">
      Join EventHub today and experience the future of event management.
    </p>
    {/* Use Link for navigation */}
    <Link
      to="/signup" // Target path for signup
      className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Sign Up Now
    </Link>
  </div>
</section>

<footer className="bg-gray-100 py-8 text-center text-gray-600 text-sm">
  <div className="container mx-auto">
    <p>&copy; {new Date().getFullYear()} EventHub. All rights reserved.</p>
    <p className="mt-2">
      <a href="/privacy" className="hover:text-indigo-600 mr-4">Privacy Policy</a>
      <a href="/terms" className="hover:text-indigo-600">Terms of Service</a>
    </p>
  </div>
</footer>
</div>
    </>
    
  );
}

export default LandingPage;