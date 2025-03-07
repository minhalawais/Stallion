import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CarDetailModal = ({ isOpen, onClose, car }) => {
  if (!car) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row md:h-[450px]"
          >
            {/* Left side - Image */}
            <div className="w-full md:w-1/2 h-64 md:h-full">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side - Content */}
            <div className="w-full md:w-1/2 p-8 relative overflow-y-auto">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Car details */}
              <div>
                <h2 className="text-4xl font-bold text-gray-900">{car.name}</h2>
                <div className="flex items-baseline mt-4 mb-8">
                  <span className="text-4xl font-bold text-gray-900">AED {car.price}</span>
                  <span className="text-gray-600 ml-2">/ DAY</span>
                </div>

                <div className="space-y-6">
                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 mb-1">Year</p>
                      <p className="text-xl font-semibold">{car.year}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Transmission</p>
                      <p className="text-xl font-semibold">{car.transmission}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Seats</p>
                      <p className="text-xl font-semibold">{car.seats} Passengers</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Luggage</p>
                      <p className="text-xl font-semibold">{car.luggage} Bags</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Features</h3>
                    <div className="grid grid-cols-2 gap-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>GPS Navigation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Bluetooth</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Leather Seats</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Climate Control</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Premium Audio</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Parking Sensors</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Link to="/booking" onClick={onClose}>
                  <button className="w-full mt-8 bg-gray-900 text-white py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CarDetailModal;