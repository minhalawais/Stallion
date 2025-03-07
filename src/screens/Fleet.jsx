import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Users, Gauge, Briefcase } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SUV from "../assets/SUV.jpg";
import SUV1 from "../assets/SUV1.jfif";
import MiniVan from "../assets/MiniVan.jfif";
import Sedan from "../assets/sedan.jpg";
import Limo from "../assets/Limo.jpg";
import Van from "../assets/Van.jpg";
import Bus from "../assets/bus.jpg";
import CarDetailModal from '../components/CarDetail'; 

const FleetPage = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section - Full Width */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen w-full bg-gray-900 text-white"
      >
        <div className="absolute inset-0">
          <img
            src={SUV1}
            alt="Luxury cars fleet"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-900/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-6xl mx-auto">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Our Premium Fleet
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl"
          >
            Experience luxury and performance with our carefully curated collection of premium vehicles
          </motion.p>
          <Link to="/booking">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-[#1c2333] hover:text-white text-[#111827] px-8 py-3 rounded-lg font-bold text-lg transition-colors"
            >
              Book Now
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Fleet Section - 6 Cards */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4">Luxury Fleet</h2>
          <div className="w-60 h-1 bg-[#111827] mx-auto"></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cars.map((car) => (
            <motion.div
              key={car.id}
              variants={itemVariants}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#111827] text-white px-3 rounded-lg text-sm font-medium">
                  {car.year}
                </div>
              </div>
              
              <div className="p-3">
                <h3 className="text-2xl font-bold mb-1 text-[#111827]">{car.name}</h3>
                <div className="flex items-center mb-3">
                  <span className="text-3xl font-bold text-[#111827]">AED {car.price}</span>
                  <span className="text-gray-600 ml-2">/ DAY</span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-center text-gray-700">
                  <div className="flex flex-col items-center">
                    <Gauge className="w-6 h-6 mb-2 text-[#111827]" />
                    <span className="text-sm font-medium">{car.speed}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Car className="w-6 h-6 mb-2 text-[#111827]" />
                    <span className="text-sm font-medium">{car.transmission}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="w-6 h-6 mb-2 text-[#111827]" />
                    <span className="text-sm font-medium">{car.seats}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Briefcase className="w-6 h-6 mb-2 text-[#111827]" />
                    <span className="text-sm font-medium">{car.luggage}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-[#111827] hover:bg-[#fdf0d5] hover:text-[#111827] text-white py-3 text-center font-semibold text-lg transition-colors"
                  onClick={() => handleOpenModal(car)}
                >
                  See Full Details
                </motion.button>
                <Link to="/booking" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#111827] hover:bg-[#fdf0d5] hover:text-[#111827] text-white py-3 text-center font-semibold text-lg transition-colors border-l border-white/20"
                  >
                    Book Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <CarDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        car={selectedCar}
      />
      <Footer />
    </div>
  );
};

export default FleetPage;