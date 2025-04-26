import React, { useState, useEffect } from 'react';
import ProfileNav from '../components/ProfileNav';
import '../assets/css/index.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
const UserDashboard = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ place: '', date: '' });
  const [bookedEvents, setBookedEvents] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/event/all'); 
             setEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err.message);
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleBooking = (eventId) => {
    const alreadyBooked = bookedEvents.includes(eventId);
    if (alreadyBooked) return;

    const updatedEvents = events.map((event) => {
      if (event._id === eventId && parseInt(event.availableSeats) > 0) {
        return { ...event, availableSeats: (parseInt(event.availableSeats) - 1).toString() };
      }
      return event;
    });

    setEvents(updatedEvents);
    setBookedEvents([...bookedEvents, eventId]);

    const bookedEvent = events.find((e) => e._id === eventId);
    setSuccessMsg(`✅ You booked: ${bookedEvent.name}`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const filteredEvents = events.filter((event) => {
    return (
      (filters.place === '' || event.place.toLowerCase().includes(filters.place.toLowerCase())) &&
      (filters.date === '' || event.date === filters.date)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <div className="text-2xl font-bold text-purple-700 animate-pulse">Loading Events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <div className="text-red-500 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6">
      <ProfileNav />

      <Link to='/chatbot'>
        <div className="fixed top-24 right-6 z-50 animate-float">
          <div
            className="cursor-pointer bg-gradient-to-r from-violet-500 to-purple-600 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-3 hover:scale-110 transition-all duration-300 blink hover:shadow-2xl"
          >
            <div className="flex items-center space-x-1">
              <span className="dot bg-white"></span>
              <span className="dot bg-white"></span>
              <span className="dot bg-white"></span>
            </div>
            <span className="font-semibold">Ask AI for Suggestions</span>
          </div>
        </div>
      </Link>

      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 p-7">Explore Events</h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
        <input
          type="text"
          name="place"
          placeholder="Search by Place"
          value={filters.place}
          onChange={handleChange}
          className="p-3 w-72 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          className="p-3 w-72 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
      </div>

      {successMsg && (
        <div className="mb-6 text-center text-green-700 font-semibold text-lg animate-pulse">
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => {
            const isBooked = bookedEvents.includes(event._id);
            const isFull = parseInt(event.availableSeats) === 0;

            return (
              <div
                key={event._id}
                className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
              >
                <h2 className="text-2xl font-semibold text-purple-700 mb-2">{event.name}</h2>
                <p className="text-gray-600"><strong>📍 Place:</strong> {event.place}</p>
                <p className="text-gray-600"><strong>📅 Date:</strong> {event.date}</p>
                <p className="text-gray-600"><strong>⏰ Time:</strong> {event.time}</p>
                <p className="text-gray-600"><strong>🪑 Seats Left:</strong> {event.availableSeats}</p>
                <button
                  onClick={() => handleBooking(event._id)}
                  disabled={isBooked || isFull}
                  className={`mt-4 w-full ${
                    isBooked || isFull
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700'
                  } text-white py-2 rounded-xl transition-all shadow-md hover:shadow-lg`}
                >
                  {isBooked ? 'BOOKED ✅' : isFull ? 'FULL ❌' : 'BOOK 🎟️'}
                </button>
              </div>
            );
          })
        ) : (
          <div className="text-center col-span-3 text-gray-500 font-medium text-lg">No events found 😕</div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
