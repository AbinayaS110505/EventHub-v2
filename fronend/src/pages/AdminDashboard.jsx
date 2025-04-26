import React, { useState, useEffect } from 'react';
import AdminNav from '../components/AdminNav';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import CSS

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '', 
    date: '',
    time: '',
    place: '',
    availableSeats: '', // added availableSeats
  });
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState('');

  const registrations = [
    { id: 1, userName: 'Alice', eventId: 1 },
    { id: 2, userName: 'Bob', eventId: 2 },
    { id: 3, userName: 'Charlie', eventId: 1 },
    { id: 4, userName: 'Daisy', eventId: 2 },
  ];

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/event/all');
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/event/add', {
        name: formData.name,
        date: formData.date,
        time: formData.time,
        place: formData.place,
        availableSeats: formData.availableSeats, // send availableSeats
      });
      setFormData({ name: '', date: '', time: '', place: '', availableSeats: '' });
      fetchEvents(); // Refresh list
      toast.success('Event added successfully! 🎉');
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error('Failed to add event 😢');
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/event/delete/${id}`);
      fetchEvents();
      toast.success('Event deleted successfully! ');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event ❌');
    }
  };

  const filteredRegistrations = selectedEventId
    ? registrations.filter(r => r.eventId === parseInt(selectedEventId))
    : registrations;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <AdminNav/>
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6 p-7">Organization Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Event Form */}
        <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
          <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Event Name"
              className="p-2 border rounded-lg"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="p-2 border rounded-lg"
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              placeholder="Place"
              className="p-2 border rounded-lg"
              required
            />
            <input
              type="number"
              name="availableSeats"
              value={formData.availableSeats}
              onChange={handleChange}
              placeholder="Available Seats"
              className="p-2 border rounded-lg"
              required
            />
            <button
              type="submit"
              className="md:col-span-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add Event
            </button>
          </form>

          {/* Event List */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Event List</h2>
            {events.length === 0 ? (
              <p className="text-gray-500">No events added yet.</p>
            ) : (
              <ul className="space-y-3">
                {events.map(event => (
                  <li key={event._id} className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{event.name}</p>
                      <p className="text-sm text-gray-600">
                        {event.date} at {event.time} - {event.place}
                      </p>
                      <p className="text-sm text-gray-600">
                        Available Seats: {event.availableSeats}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Users Info */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Users Info</h2>

          <button
            onClick={() => setShowUserDetails(!showUserDetails)}
            className="w-full mb-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            {showUserDetails ? 'Hide Users Details' : 'Show Users Details'}
          </button>

          {showUserDetails && (
            <>
              <select
                className="w-full p-2 mb-4 border rounded"
                onChange={(e) => setSelectedEventId(e.target.value)}
              >
                <option value="">-- Filter by Event --</option>
                {events.map(event => (
                  <option key={event._id} value={event._id}>{event.name}</option>
                ))}
              </select>

              <ul className="space-y-3">
                {filteredRegistrations.length === 0 ? (
                  <p className="text-gray-500">No users registered.</p>
                ) : (
                  filteredRegistrations.map(reg => {
                    const event = events.find(e => e._id === reg.eventId);
                    return (
                      <li key={reg.id} className="bg-gray-100 p-3 rounded">
                        <span className="font-medium">{reg.userName}</span> — <span>{event?.name}</span>
                      </li>
                    );
                  })
                )}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default AdminDashboard;
