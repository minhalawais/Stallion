import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar } from 'lucide-react';
import Navbar from "../components/Navbar.jsx"

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: ''
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState({
    profile: true,
    bookings: true
  });
  const [error, setError] = useState({
    profile: null,
    bookings: null
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    fetchUserData();
    fetchBookingHistory();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://stallionsls.com/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();
      setUserData(data);
      setFormData({
        first_name: data.first_name,
        last_name: data.last_name
      });
    } catch (err) {
      setError(prev => ({ ...prev, profile: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const fetchBookingHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://stallionsls.com/api/api/bookings/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch booking history');
      const data = await response.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(prev => ({ ...prev, bookings: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, bookings: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://stallionsls.com/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to update profile');
      const updatedData = await response.json();
      setUserData(updatedData);
      setIsEditing(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      setError(prev => ({ ...prev, profile: err.message }));
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'confirmed': 'bg-green-500',
      'pending': 'bg-yellow-500',
      'cancelled': 'bg-red-500',
      'completed': 'bg-blue-500',
      'in_progress': 'bg-purple-500'
    };
    return statusColors[status] || 'bg-gray-500';
  };

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (err) {
      return 'Invalid Date';
    }
  };

  const formatTime = (time) => {
    return time?.slice(0, 5) || 'N/A';
  };

  const renderError = (message) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
      <p className="text-red-600">{message}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
      >
        Try Again
      </button>
    </div>
  );

  const renderLoading = () => (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
        <Navbar/>
      <div className="w-full">
        <div className="flex space-x-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2 px-4 ${
              activeTab === 'profile'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-2 px-4 ${
              activeTab === 'bookings'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
          >
            Booking History
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Personal Information</h2>
              </div>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                  Edit Profile
                </button>
              )}
            </div>

            {updateSuccess && (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                Profile updated successfully!
              </div>
            )}

            {loading.profile ? (
              renderLoading()
            ) : error.profile ? (
              renderError(error.profile)
            ) : (
              isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-3 mt-4">
                    <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Name:</span>
                    <span>{userData.first_name} {userData.last_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Email:</span>
                    <span>{userData.email}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Member since: {new Date(userData.created_at).toLocaleDateString()}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Booking History</h2>
            </div>
            {loading.bookings ? (
              renderLoading()
            ) : error.bookings ? (
              renderError(error.bookings)
            ) : (
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <p className="text-center text-gray-500">No booking history found</p>
                ) : (
                  bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">
                            Pickup: {booking.pickup_location || 'N/A'}
                          </h3>
                          <p className="text-gray-600">
                            Drop-off: {booking.dropoff_location || 'N/A'}
                          </p>
                        </div>
                        <span className={`${getStatusColor(booking.status)} text-white px-3 py-1 rounded-full text-sm`}>
                          {(booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)) || 'Unknown'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Date: </span>
                          {formatDate(booking.pickup_date)}
                        </div>
                        <div>
                          <span className="font-medium">Time: </span>
                          {formatTime(booking.pickup_time)}
                        </div>
                        {booking.vehicle_type && (
                          <div>
                            <span className="font-medium">Vehicle: </span>
                            {booking.vehicle_type}
                          </div>
                        )}
                        {booking.price && (
                          <div>
                            <span className="font-medium">Price: </span>
                            ${booking.price}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;