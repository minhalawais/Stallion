const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/userauth.js');
const {
  createBooking,
  getBookings,
  getAllUserBookings,
  updateBooking,
  cancelBooking,
  getBookingById,
  getAllBookings,
  getTodayBookings,
  getWeekBookings,
  getMonthBookings
} = require('../controllers/bookingController');

// Create new booking
router.post('/bookings', authenticateToken, createBooking);

// Get current and future bookings
router.get('/bookings/current', authenticateToken, getBookings);

// Get all bookings including past ones
router.get('/bookings/all', authenticateToken, getAllUserBookings);
router.get("/bookings/every", authenticateToken, getAllBookings);

router.get('/bookings/today', authenticateToken, getTodayBookings);
router.get('/bookings/week', authenticateToken, getWeekBookings);
router.get('/bookings/month', authenticateToken, getMonthBookings);

// Get specific booking by ID
router.get('/bookings/:id', authenticateToken, getBookingById);

// Update existing booking
router.put('/bookings/:id', authenticateToken, updateBooking);

// Cancel booking
router.put('/bookings/:id/cancel', authenticateToken, cancelBooking);




module.exports = router;