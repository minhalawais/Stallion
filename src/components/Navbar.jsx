import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, LogOut, UserPlus, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as jwtDecode from "jwt-decode";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode.jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp < currentTime) {
            handleLogout();
            toast.error('Session expired. Please login again.');
            return;
          }
          
          setIsAuthenticated(true);
          setIsAdmin(decoded.isAdmin);
        } catch (error) {
          handleLogout();
        }
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };

    checkAuth();
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setIsAdmin(false);
    toast.success('Logged out successfully');
    navigate('/login');
    window.location.reload();
  };

  const handleBookRideClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to book a ride');
      navigate('/login');
    } else {
      navigate('/booking');
    }
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Fleet', path: '/fleet' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Book Ride', path: '/booking', onClick: handleBookRideClick },
    { label: 'Contact', path: '/contact' }
  ];

  const authItems = isAuthenticated
    ? [
        { 
          label: isAdmin ? 'Admin Dashboard' : 'Profile',
          path: isAdmin ? '/admin' : '/profile', 
          icon: User 
        },
        { 
          label: 'Logout', 
          path: '#', 
          icon: LogOut, 
          onClick: handleLogout 
        }
      ]
    : [
        { label: 'Login', path: '/login', icon: LogIn },
        { label: 'Sign Up', path: '/signup', icon: UserPlus }
      ];

  const isActivePath = (path) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname === path;
  };

  useEffect(() => {
    const protectedRoutes = ['/booking', '/profile', '/admin'];
    const adminRoutes = ['/admin'];
    
    const token = localStorage.getItem('token');
    if (protectedRoutes.includes(location.pathname) && !token) {
      navigate('/login');
      toast.error('Please login to access this page');
      return;
    }

    if (token) {
      try {
        const decoded = jwtDecode.jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          handleLogout();
          toast.error('Session expired. Please login again.');
          return;
        }

        if (adminRoutes.includes(location.pathname) && !decoded.isAdmin) {
          navigate('/');
          toast.error('Access denied. Admin only.');
        }
      } catch (error) {
        handleLogout();
      }
    }
  }, [location.pathname]);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-white shadow-lg' : 'py-4 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2"
              >
                <span className="text-2xl font-bold bg-[#111827] text-white px-3 py-1 rounded-lg">
                  ST
                </span>
                <span className="text-xl font-semibold text-[#111827]">
                  Stallion
                </span>
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center">
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={item.onClick}
                    className="relative px-6 py-2"
                  >
                    <motion.div
                      className="relative z-10"
                      whileHover={{ y: -2 }}
                    >
                      <span className={`text-sm font-medium ${
                        isActivePath(item.path) ? 'text-white' : 'text-gray-600'
                      } px-2`}>
                        {item.label}
                      </span>
                      {isActivePath(item.path) && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 bg-[#111827] rounded-full -mx-2"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                ))}
              </div>

              <div className="flex items-center ml-6 space-x-3">
                {authItems.map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      onClick={item.onClick}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
                        ${item.label === 'Login' 
                          ? 'bg-[#111827] text-white hover:bg-gray-800'
                          : item.label === 'Sign Up'
                          ? 'border-2 border-[#111827] text-[#111827] hover:bg-gray-50'
                          : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-2 rounded-lg text-[#111827] hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t mt-2"
            >
              <div className="px-4 py-6 space-y-3 max-h-[70vh] overflow-y-auto">
                {[...menuItems, ...authItems].map((item) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Link
                      to={item.path}
                      onClick={(e) => {
                        setIsOpen(false);
                        item.onClick?.(e);
                      }}
                      className={`flex items-center space-x-2 p-3 rounded-lg
                        ${isActivePath(item.path)
                          ? 'bg-[#111827] text-white'
                          : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {item.icon && <item.icon size={18} />}
                      <div className="font-medium">{item.label}</div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <div className={`${isScrolled ? 'h-16' : 'h-20'} transition-all duration-300`} />
    </>
  );
};

export default Navbar;