import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Car,
  Trophy,
  Train,
  Heart,
  Compass,
  Wine,
  Briefcase,
  Music,
  Plane,
  ChevronDown,
  Star,
  Clock,
  Phone
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import hero image (replace with your actual image)
import HeroImage from '../assets/MiniVan.jfif';

const ServiceCard = ({ icon: Icon, title, description, delay, index }) => {
    const gridPositions = [
      "lg:col-span-2 lg:row-span-1",
      "lg:col-span-1 lg:row-span-2",
      "lg:col-span-1 lg:row-span-1",
      "lg:col-span-1 lg:row-span-1",
      "lg:col-span-2 lg:row-span-1",
      "lg:col-span-1 lg:row-span-2",
      "lg:col-span-1 lg:row-span-1",
      "lg:col-span-2 lg:row-span-1",
      "lg:col-span-1 lg:row-span-1",
    ];
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          delay: delay,
          ease: "easeOut"
        }}
        viewport={{ once: true }}
        className={`relative ${gridPositions[index]} h-full`}
      >
        <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-lg">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500" />
            <div className="h-full w-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
          </div>
  
          {/* Card Content */}
          <div className="relative h-full p-8 flex flex-col">
            {/* Icon */}
            <div className="inline-flex">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-2xl blur opacity-20" />
                <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl">
                  <Icon className="text-white" size={28} />
                </div>
              </div>
            </div>
  
            {/* Content */}
            <div className="mt-6 flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

const Feature = ({ icon: Icon, title, description, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="relative z-10 bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-all duration-300">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon Container with Animation */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.3 }}
          className="relative flex items-center justify-center w-16 h-16 mx-auto mb-6"
        >
          {/* Background circles for depth */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
          <Icon className="relative z-10 text-white" size={28} />
        </motion.div>
  
        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-300 text-center leading-relaxed group-hover:text-white transition-colors duration-300">
          {description}
        </p>
  
        {/* Decorative Elements */}
        <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
  

const ServicesPage = () => {
  const services = [
    {
      icon: MapPin,
      title: "Point to Point",
      description: "Direct transportation between any two locations with professional chauffeurs ensuring a comfortable and timely journey."
    },
    {
      icon: Trophy,
      title: "Sporting Events",
      description: "Luxury transportation to major sporting events. Arrive in style and avoid parking hassles with our door-to-door service."
    },
    {
      icon: Train,
      title: "Train Station Service",
      description: "Seamless connections to and from train stations. Never miss your connection with our punctual pickup and drop-off service."
    },
    {
      icon: Heart,
      title: "Weddings",
      description: "Make your special day perfect with our luxury wedding transportation services. Elegant vehicles and professional chauffeurs."
    },
    {
      icon: Compass,
      title: "Tours",
      description: "Customized city tours and sightseeing experiences. Explore destinations in comfort with our knowledgeable drivers."
    },
    {
      icon: Wine,
      title: "Dinner Services",
      description: "Evening transportation for special dining occasions. Enjoy your night out without worrying about driving."
    },
    {
      icon: Briefcase,
      title: "Corporate Services",
      description: "Professional transportation solutions for business needs. Impress clients and ensure executives arrive on time."
    },
    {
      icon: Music,
      title: "Concerts",
      description: "Reliable transportation to music venues and events. Skip the parking lines and enjoy the show stress-free."
    },
    {
      icon: Plane,
      title: "Airport Transfers",
      description: "Punctual airport pickup and drop-off services. Track flights and adjust to schedule changes automatically."
    }
  ];

  const features = [
    {
      icon: Star,
      title: "Premium Service",
      description: "Experience unmatched luxury and comfort with our high-end fleet"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock service to meet your transportation needs"
    },
    {
      icon: Phone,
      title: "Dedicated Support",
      description: "Professional customer service team at your service"
    }
  ];

  const heroContent = {
    heading1: "Elevate Your",
    heading2: "Journey",
    description: "Experience unparalleled luxury and sophistication in every ride. Our premium fleet and professional chauffeurs are ready to transform your transportation into an unforgettable experience.",
    stats: [
      { value: "24/7", label: "Service" },
      { value: "100+", label: "Luxury Vehicles" },
      { value: "15k+", label: "Happy Clients" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70 z-10" />
        <img
          src={HeroImage}
          alt="Luxury Transportation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="max-w-6xl px-4 mx-auto w-full -mt-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center -mt-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-6xl lg:text-7xl font-bold text-white mb-4">
                  {heroContent.heading1}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {heroContent.heading2}
                  </span>
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-white/90 mb-4 leading-relaxed"
                >
                  {heroContent.description}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-6 mb-3"
                >
                  <Link to="/booking">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                    >
                      Book Now
                    </motion.button>
                  </Link>
                  <Link to="/fleet">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
                    >
                      View Fleet
                    </motion.button>
                  </Link>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="grid grid-cols-3 gap-8"
                >
                  {heroContent.stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="text-white"
                    >
                      <div className="text-3xl font-bold mb-2">{stat.value}</div>
                      <div className="text-white/80">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl transform rotate-3"></div>
                  <div className="absolute inset-0 bg-gradient-to-l from-blue-500/20 to-purple-500/20 rounded-3xl transform -rotate-3"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Services Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Exceptional Services for Every Occasion
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            From corporate events to special occasions, our premium fleet and professional chauffeurs 
            ensure every journey exceeds expectations. Experience the perfect blend of luxury, 
            reliability, and exceptional service.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Features Section */}
        <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gray-900" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      
      {/* Content Container */}
      <div className="relative z-10 px-6 py-10 md:py-20">
        {/* Animated Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
              Why Choose Us
            </h2>
          </motion.div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Experience the perfect blend of luxury, reliability, and exceptional service
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => (
              <Feature
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-40 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </motion.div>

        {/* CTA Section */}
       
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-10 text-center relative overflow-hidden"
>
  {/* Decorative background elements */}
  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

  <div className="relative z-10 max-w-6xl mx-auto px-4">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold mb-6"
    >
      Ready to Experience{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        Premium Transportation?
      </span>
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      viewport={{ once: true }}
      className="text-gray-600 mb-4 text-lg md:text-xl"
    >
      Book your journey today and discover the DriveElite difference
    </motion.p>
    <Link to="/booking">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-12 py-4 rounded-xl 
          font-bold transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
      >
        <span className="relative z-10">Book Your Ride Now</span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>
    </Link>
  </div>
</motion.div>

{/* FAQ Section */}
   <div className="max-w-7xl mx-auto px-4 py-10">
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold mb-6"
    >
      Frequently Asked{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        Questions
      </span>
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      viewport={{ once: true }}
      className="text-gray-600 max-w-2xl mx-auto text-lg"
    >
      Find answers to common questions about our services and booking process
    </motion.p>
  </motion.div>

  <div className="grid md:grid-cols-2 gap-8">
    {[
      {
        question: "How far in advance should I book?",
        answer: "We recommend booking at least 24 hours in advance to ensure availability, especially for special events or peak times. However, we can accommodate last-minute bookings based on availability."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, corporate accounts, and digital payments including Apple Pay and Google Pay. Payment is processed securely through our booking system."
      },
      {
        question: "Are your drivers background checked?",
        answer: "Yes, all our chauffeurs undergo rigorous background checks, drug testing, and professional training. They are licensed, insured, and experienced professionals."
      },
      {
        question: "What if my flight is delayed?",
        answer: "We monitor all flights in real-time and adjust pickup times automatically. There's no additional charge for flight delays, and we ensure we're there when you arrive."
      }
    ].map((faq, index) => (
      <motion.div
        key={faq.question}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl 
          transition-all duration-300 border border-gray-100 hover:border-gray-200"
      >
        <motion.div
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 
            transition-colors duration-300"
          >
            {faq.question}
          </h3>
          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
        </motion.div>
      </motion.div>
    ))}
  </div>
</div>
  
</div>    
        
  
        <Footer />
      </div>
     
    );
  };
  
  export default ServicesPage;