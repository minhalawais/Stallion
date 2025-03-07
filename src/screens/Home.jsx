import React from 'react';
import { motion } from 'framer-motion';
import { Car, Calendar, MapPin, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import images
import SUV from "../assets/SUV.jpg";
import SUV1 from "../assets/SUV1.jfif";
import MiniVan from "../assets/MiniVan.jfif";
import Sedan from "../assets/sedan.jpg";
import Limo from "../assets/Limo.jpg";
import Van from "../assets/Van.jpg";
import Bus from "../assets/bus.jpg";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-10" />
        <div className="absolute inset-0">
          <img 
            src={SUV}
            alt="Luxury car on mountain road" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 h-full flex items-center px-4">
          <div className="max-w-7xl mx-auto -mt-10">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-4"
            >
              Experience Luxury
              <br />
              On Your Terms
            </motion.h1>
            <motion.p 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 mb-6 max-w-xl"
            >
              Premium vehicles for your journey, with exceptional service and flexibility.
            </motion.p>
            <Link to="/booking">
              <motion.button
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-[#111827] hover:text-white"
              >
                Reserve Now
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-12 px-4 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Car, title: 'Premium Fleet', desc: 'Luxury and performance vehicles' },
              { icon: Calendar, title: 'Flexible Booking', desc: 'Daily to monthly rentals' },
              { icon: MapPin, title: 'Multiple Locations', desc: 'Convenient pickup points' },
              { icon: Clock, title: '24/7 Support', desc: 'Always here to help' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-4 rounded-xl shadow-sm"
              >
                <feature.icon className="w-10 h-10 mb-3 text-gray-900" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Unlock the Road Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 px-4 bg-white"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Unlock the Road</h2>
            <p className="text-gray-600 mb-6">
              Welcome to our car rental service, where convenience and flexibility meet exceptional quality. Discover a wide range of vehicles meticulously maintained to ensure a seamless experience.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { title: 'Explore Nearby Attractions', desc: 'Plan your adventure' },
                { title: 'Car Delivery', desc: 'Flexible drop-off points' },
                { title: 'Plan Your Route', desc: 'Detailed trip planning' },
                { title: 'Convenient', desc: 'Hassle-free rentals' }
              ].map((item) => (
                <div key={item.title} className="space-y-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
            <Link to="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Secure Your Booking
              </motion.button>
            </Link>
          </div>
          <div className="relative">
            <img 
              src={Sedan}
              alt="Luxury sedan"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </motion.div>

      {/* Drive in Style Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 px-4 bg-white"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <img 
              src={SUV1}
              alt="Premium vehicle"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Drive in Style:<br />Our Premium Selection</h2>
            <p className="text-gray-600 mb-6">
              From the sleek and sporty to the spacious and luxurious, discover your perfect ride.
            </p>
            <div className="space-y-3 mb-6">
              {['Compact Cars', 'Midsize Sedans', 'SUVs & Crossovers'].map((category) => (
                <motion.div 
                  key={category}
                  whileHover={{ x: 10 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer"
                >
                  <span className="font-medium">{category}</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              ))}
            </div>
            <div className="flex space-x-4">
              <Link to="/fleet">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg"
                >
                  Explore Inventory
                </motion.button>
              </Link>
              <Link to="/fleet">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="border border-gray-900 text-gray-900 px-6 py-3 rounded-lg"
                >
                  Find Your Fit
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
       {/* Featured Cars Section */}
       <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 px-6 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Vehicles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { image: Sedan, name: 'Luxury Sedan', price: '299' },
              { image: MiniVan, name: 'Executive Vans', price: '399' },
              { image: SUV, name: 'Luxury SUVs', price: '499' },
              { image: Van, name: 'Luxury MiniBus', price: '299' },
              { image: Bus, name: 'Luxury Bus', price: '399' },
              { image: Limo, name: 'Stretch Limo', price: '499' }
            ].map((car, index) => (
              <motion.div
                key={car.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={car.image}
                    alt={car.name}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                <p className="text-gray-600">From ${car.price}/day</p>
                <Link to="/booking">
                  <button className="mt-4 bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Book Now
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <Footer/>
    </div>
  );
};

export default Home;