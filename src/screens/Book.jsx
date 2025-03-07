import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Briefcase, Phone, Mail, ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SUV from "../assets/SUV.jpg";
import MiniVan from "../assets/MiniVan.jfif";
import Sedan from "../assets/sedan.jpg";
import Limo from "../assets/Limo.jpg";
import Van from "../assets/Van.jpg";
import Bus from "../assets/bus.jpg";
import BookingsDisplay from '../components/BookingDisplay';

const BookingPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const cars = [
    {
      id: 1,
      image: Sedan,
      name: 'Luxury Sedan',
      price: "1500",
      transmission: "Automatic",
      seats: 5,
      luggage: 4,
      speed: 4800,
      year: "2024"
    },
    {
      id: 2,
      image: MiniVan,
      name: 'Executive Vans',
      price: "2000",
      transmission: "Automatic",
      seats: 7,
      luggage: 6,
      speed: 4200,
      year: "2024"
    },
    {
      id: 3,
      image: SUV,
      name: 'Luxury SUVs',
      price: "2500",
      transmission: "Automatic",
      seats: 6,
      luggage: 5,
      speed: 5000,
      year: "2024"
    },
    {
      id: 4,
      image: Van,
      name: 'Luxury MiniBus',
      price: "3000",
      transmission: "Automatic",
      seats: 9,
      luggage: 8,
      speed: 3800,
      year: "2024"
    },
    {
      id: 5,
      image: Bus,
      name: 'Luxury Bus',
      price: "4000",
      transmission: "Automatic",
      seats: 16,
      luggage: 16,
      speed: 3500,
      year: "2024"
    },
    {
      id: 6,
      image: Limo,
      name: 'Stretch Limo',
      price: "5000",
      transmission: "Automatic",
      seats: 8,
      luggage: 4,
      speed: 4500,
      year: "2024"
    }
  ];

  const [formData, setFormData] = useState({
    pickupDate: '',
    pickupTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    phoneNumber: '',
    email: '',
  });
  
  const [selectedCar, setSelectedCar] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+1|1)?[-. ]?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';
    if (!formData.pickupLocation) newErrors.pickupLocation = 'Pickup location is required';
    if (!formData.dropoffLocation) newErrors.dropoffLocation = 'Drop-off location is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else if (!phoneRegex.test(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number format';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!selectedCar) newErrors.car = 'Please select a vehicle';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');
    
    if (!validateForm()) {
      setSubmitMessage('Please fill in all required fields correctly.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://stallionsls.com/api/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          passengers,
          luggage,
          selectedCar: {
            id: selectedCar.id,
            name: selectedCar.name,
            price: selectedCar.price
          }
        })
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      setSubmitMessage('Booking created successfully!');
      // Reset form
      setFormData({
        pickupDate: '',
        pickupTime: '',
        pickupLocation: '',
        dropoffLocation: '',
        phoneNumber: '',
        email: '',
      });
      setSelectedCar(null);
      setPassengers(1);
      setLuggage(0);
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error('Booking error:', error);
      setSubmitMessage(error.message || 'Failed to create booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Book Your Luxury Ride</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Experience unparalleled luxury and comfort with our premium fleet.</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg pl-10 ${errors.pickupDate ? 'border-red-500' : ''}`}
                  />
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time</label>
                <div className="relative">
                  <input
                    type="time"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg pl-10 ${errors.pickupTime ? 'border-red-500' : ''}`}
                  />
                  <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  {errors.pickupTime && <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                <div className="relative">
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    placeholder="Enter pickup location"
                    className={`w-full p-3 border rounded-lg pl-10 ${errors.pickupLocation ? 'border-red-500' : ''}`}
                  />
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Location</label>
                <div className="relative">
                  <input
                    type="text"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleInputChange}
                    placeholder="Enter drop-off location"
                    className={`w-full p-3 border rounded-lg pl-10 ${errors.dropoffLocation ? 'border-red-500' : ''}`}
                  />
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  {errors.dropoffLocation && <p className="text-red-500 text-sm mt-1">{errors.dropoffLocation}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`w-full p-3 border rounded-lg pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className={`w-full p-3 border rounded-lg pl-10 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                  />
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                  <div className="flex items-center border rounded-lg">
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="p-3 hover:bg-gray-100 rounded-l-lg"
                    >
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </button>
                    <span className="flex-1 text-center">{passengers}</span>
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.min(16, passengers + 1))}
                      className="p-3 hover:bg-gray-100 rounded-r-lg"
                    >
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Luggage</label>
                  <div className="flex items-center border rounded-lg">
                    <button
                      type="button"
                      onClick={() => setLuggage(Math.max(0, luggage - 1))}
                      className="p-3 hover:bg-gray-100 rounded-l-lg"
                    >
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </button>
                    <span className="flex-1 text-center">{luggage}</span>
                    <button
                      type="button"
                      onClick={() => setLuggage(Math.min(16, luggage + 1))}
                      className="p-3 hover:bg-gray-100 rounded-r-lg"
                    >
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {submitMessage && (
              <div className={`p-3 rounded-lg mb-4 ${
                submitMessage.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {submitMessage}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Proceed to Book'}
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Vehicle</h2>
            {errors.car && <p className="text-red-500 text-sm mb-4">{errors.car}</p>}
            
            <div className="grid grid-cols-1 gap-4">
              {cars.map((car) => (
                <motion.div
                  key={car.id}
                  whileHover={{ scale: 1.01 }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedCar?.id === car.id
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 hover:border-gray-900'
                  }`}
                  onClick={() => setSelectedCar(car)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{car.name}</h3>
                      <p className="text-sm opacity-75">{car.transmission}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {car.seats} Seats
                        </span>
                        <span className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {car.luggage} Luggage
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl">AED {car.price}</div>
                      <div className="text-sm opacity-75">per day</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </form>
        <BookingsDisplay/>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;