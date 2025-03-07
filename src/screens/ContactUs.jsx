import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, User, Send, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  const form = useRef();
  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  // Check if reCAPTCHA script is loaded properly
  useEffect(() => {
    // Add event listener to check if grecaptcha is defined
    const checkRecaptchaLoaded = () => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        setRecaptchaLoaded(true);
      }
    };

    // Check immediately and also set an interval to check
    checkRecaptchaLoaded();
    const intervalId = setInterval(checkRecaptchaLoaded, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRecaptchaChange = (value) => {
    setCaptchaValue(value);
    // Log to verify reCAPTCHA response
    console.log("reCAPTCHA value:", value);
  };

  const handleRecaptchaError = () => {
    console.error("reCAPTCHA failed to load or encountered an error");
    setSubmitStatus({ 
      type: 'error', 
      message: 'There was a problem loading the reCAPTCHA. Please refresh the page and try again.'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Additional validation for reCAPTCHA
    if (!captchaValue) {
      setSubmitStatus({ type: 'error', message: 'Please complete the reCAPTCHA verification' });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Add the captcha value to the form data
      const formElement = form.current;
      const captchaInput = document.createElement('input');
      captchaInput.type = 'hidden';
      captchaInput.name = 'g-recaptcha-response';
      captchaInput.value = captchaValue;
      formElement.appendChild(captchaInput);

      // Replace these with your actual EmailJS credentials
      await emailjs.sendForm(
        'service_k1ixo9r',
        'template_mqx2lzg',
        formElement,
        '1YUVIxu0VyuoIqUA4'
      );

      // Remove the temporary input element
      formElement.removeChild(captchaInput);

      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully! We will get back to you soon.'
      });
      
      // Reset form and captcha
      setFormData({ name: '', email: '', message: '' });
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setCaptchaValue(null);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+1 703-888-8094", "+1 571-489-3273"]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["info@stallionsls.com"]
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      details: ["5800 16th N Suite 67 Arlington VA 22205"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4 ">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row"
        >
          {/* Left Side - Contact Information */}
          <div className="md:w-5/12 bg-[#111827] p-8 md:p-12 text-white">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-gray-300 mb-8">
                  Fill up the form and we will get back to you within 24 hours.
                </p>
              </div>

              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-white/10 p-3 rounded-lg">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-300">{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Social Media */}
              <div className="pt-8 mt-8 border-t border-white/20">
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-6">
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Twitter className="w-6 h-6" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Youtube className="w-6 h-6" />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="md:w-7/12 bg-white p-8 md:p-12">
            <h2 className="text-2xl font-bold text-[#111827] mb-6">Send us a Message</h2>
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 border rounded-lg pl-12 focus:ring-2 focus:ring-[#111827] focus:border-transparent"
                    placeholder="John Doe"
                  />
                  <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 border rounded-lg pl-12 focus:ring-2 focus:ring-[#111827] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                  <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-4 border rounded-lg pl-12 focus:ring-2 focus:ring-[#111827] focus:border-transparent"
                    placeholder="Your message here..."
                  />
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="recaptcha-container">
                {!recaptchaLoaded && (
                  <p className="text-amber-600 text-sm mb-2">
                    Loading reCAPTCHA verification...
                  </p>
                )}
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeYhukqAAAAAPcfx5Xk-kV2e4RbF1YnqvHnZAhK" 
                  onChange={handleRecaptchaChange}
                  onError={handleRecaptchaError}
                  onExpired={() => setCaptchaValue(null)}
                />
              </div>

              {submitStatus.message && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting || !captchaValue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#111827] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#1c2333] transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;