import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, DollarSign, Users, Star,Calendar, Clock, Car, Heart , MapPin} from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sedan from "../assets/sedan.jpg";
import SUV1 from "../assets/SUV1.jfif";
import Founder from "../assets/Founder.jpg"


const AboutPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen w-full"
      >
        <div className="absolute inset-0">
          <img
            src={Sedan}
            alt="Luxury fleet"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative h-screen w-full">
      <div className="absolute inset-0">
        <img
          src="/api/placeholder/1920/1080"
          alt="Luxury fleet"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold text-white mb-8"
        >
          EXPERIENCE LUXURY
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-3xl text-lg md:text-xl text-white/90 leading-relaxed mx-auto"
        >
          We offer many different services such as airport transportation, private aviation services, pier & cruise transportation, wedding & prom transportation, drives to casinos or business travel, family travel, and many more! Stallionz Limousine is your one-stop destination for all your transportation needs. If you are a travel agent, book your client with Stallionz Limousine and get a 5% commission on every ride.
        </motion.p>
      </div>
    </div>
      </motion.div>

      {/* Journey & Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Journey</h2>
              <p className="text-gray-600">
                Founded in 2020, DriveElite emerged from a vision to transform the luxury car rental experience. What began as a small fleet of premium vehicles has evolved into Dubai's most prestigious collection of luxury automobiles, serving distinguished clients who demand excellence.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600">
                We strive to deliver unparalleled luxury mobility solutions, combining exceptional vehicles with personalized service. Our commitment goes beyond providing cars; we create memorable experiences that reflect the sophistication and aspirations of our clients.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={SUV1}
              alt="Luxury cars"
              className="rounded-lg shadow-xl w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4 bg-[#111827] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Star className="w-8 h-8" />, title: "Excellence", desc: "Delivering superior service and maintaining the highest standards in our fleet and operations." },
              { icon: <Shield className="w-8 h-8" />, title: "Reliability", desc: "Ensuring consistent, dependable service and well-maintained vehicles for every journey." },
              { icon: <DollarSign className="w-8 h-8" />, title: "Affordability", desc: "Providing competitive rates without compromising on quality and luxury." },
              { icon: <Users className="w-8 h-8" />, title: "Loyalty", desc: "Building lasting relationships through exceptional customer care and personalized experiences." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-orange-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <img
              src={Founder}
              alt="Founder"
              className="rounded-lg shadow-xl w-full"
            />
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-bold mb-6">Meet Our Founder</h2>
              <p className="text-gray-600">
                With over 15 years of experience in the luxury automotive industry, our founder established Stallion with a vision to revolutionize the car rental experience in Dubai. His passion for exceptional service and deep understanding of luxury vehicles has shaped our company's commitment to excellence.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Leadership & Expertise</h2>
              <p className="text-gray-600">
                Our leadership team brings together decades of experience in luxury automotive services, hospitality, and customer experience. This combination of expertise ensures that every aspect of our service meets the highest standards of quality and professionalism.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
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

      <Footer />
    </div>
  );
};

export default AboutPage;