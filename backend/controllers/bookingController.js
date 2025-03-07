const pool = require('../db');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const {
      pickupDate,
      pickupTime,
      pickupLocation,
      dropoffLocation,
      passengers,
      luggage,
      phoneNumber,
      email,
      selectedCar
    } = req.body;

    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Check if selectedCar exists and has required properties
    if (!selectedCar || !selectedCar.id || !selectedCar.name || !selectedCar.price) {
      return res.status(400).json({ 
        error: 'Invalid car selection',
        details: 'Car selection must include id, name, and price'
      });
    }

    // Get user_id from the authenticated user object
    const userId = req.user.id;

    // Validate required fields
    const requiredFields = {
      pickupDate,
      pickupTime,
      pickupLocation,
      dropoffLocation,
      phoneNumber,
      email,
      selectedCar
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        missingFields 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const query = `
      INSERT INTO bookings (
        pickup_date,
        pickup_time,
        pickup_location,
        dropoff_location,
        passengers,
        luggage,
        phone_number,
        email,
        car_id,
        car_name,
        car_price,
        user_id,
        status,
        created_at,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *
    `;

    const values = [
      pickupDate,
      pickupTime,
      pickupLocation,
      dropoffLocation,
      passengers || null,
      luggage || null,
      phoneNumber,
      email,
      selectedCar.id,
      selectedCar.name,
      selectedCar.price,
      userId,
      'pending'
    ];

    const result = await pool.query(query, values);
    res.status(201).json({
      success: true,
      booking: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ 
      error: 'Failed to create booking',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get upcoming bookings (today and future)
const getBookings = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const userId = req.user.id;
    const currentDate = new Date().toISOString().split('T')[0];

    const query = `
      SELECT * FROM bookings 
      WHERE user_id = $1
        AND pickup_date >= $2
        AND status != 'cancelled'  -- Exclude cancelled bookings
      ORDER BY 
        CASE 
          WHEN status = 'confirmed' THEN 1
          WHEN status = 'pending' THEN 2
          ELSE 3
        END,
        pickup_date ASC, 
        pickup_time ASC
    `;

    const result = await pool.query(query, [userId, currentDate]);
    
    // Map the results to include a more user-friendly status
    const formattedBookings = result.rows.map(booking => ({
      ...booking,
      statusText: getStatusText(booking.status)
    }));

    res.json(formattedBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      error: 'Failed to fetch bookings',
      details: error.message
    });
  }
};

// Helper function to get user-friendly status text
const getStatusText = (status) => {
  const statusMap = {
    'confirmed': 'Confirmed',
    'pending': 'Pending Confirmation',
    'completed': 'Completed',
    'cancelled': 'Cancelled',
    'in_progress': 'In Progress'
  };
  return statusMap[status] || status;
};

// Get all bookings for a user (including past bookings)
const getAllUserBookings = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const userId = req.user.id;

    const query = `
      SELECT * FROM bookings 
      WHERE user_id = $1 
      ORDER BY pickup_date DESC, pickup_time DESC
    `;
    
    const result = await pool.query(query, [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    res.status(500).json({ 
      error: 'Failed to fetch bookings',
      details: error.message 
    });
  }
};

// Update a booking
const updateBooking = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const bookingId = req.params.id;
    const userId = req.user.id;
    
    // Validate booking ownership
    const checkOwnershipQuery = 'SELECT user_id FROM bookings WHERE id = $1';
    const ownershipResult = await pool.query(checkOwnershipQuery, [bookingId]);
    
    if (ownershipResult.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    if (ownershipResult.rows[0].user_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this booking' });
    }

    const {
      pickup_date,
      pickup_time,
      pickup_location,
      dropoff_location,
      passengers,
      luggage,
      phone_number,
      email
    } = req.body;

    // Validate required fields
    const requiredFields = {
      pickup_date,
      pickup_time,
      pickup_location,
      dropoff_location,
      phone_number,
      email
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const query = `
      UPDATE bookings 
      SET 
        pickup_date = $1,
        pickup_time = $2,
        pickup_location = $3,
        dropoff_location = $4,
        passengers = $5,
        luggage = $6,
        phone_number = $7,
        email = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9 AND user_id = $10
      RETURNING *
    `;

    const values = [
      pickup_date,
      pickup_time,
      pickup_location,
      dropoff_location,
      passengers || null,
      luggage || null,
      phone_number,
      email,
      bookingId,
      userId
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found or unauthorized' });
    }

    res.json({
      success: true,
      booking: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      error: 'Failed to update booking',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const bookingId = req.params.id;
    const userId = req.user.id;

    // Validate booking ownership and status
    const checkBookingQuery = 'SELECT user_id, status FROM bookings WHERE id = $1';
    const bookingResult = await pool.query(checkBookingQuery, [bookingId]);

    if (bookingResult.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const booking = bookingResult.rows[0];
    
    if (booking.user_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to cancel this booking' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ error: 'Booking is already cancelled' });
    }

    const query = `
      UPDATE bookings 
      SET 
        status = 'cancelled',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;

    const result = await pool.query(query, [bookingId, userId]);

    res.json({
      success: true,
      booking: result.rows[0]
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      error: 'Failed to cancel booking',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const bookingId = req.params.id;
    const userId = req.user.id;

    const query = `
      SELECT * FROM bookings 
      WHERE id = $1 AND user_id = $2
    `;
    
    const result = await pool.query(query, [bookingId, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found or unauthorized' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ 
      error: 'Failed to fetch booking',
      details: error.message 
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const query = `
      SELECT * FROM bookings 
      ORDER BY created_at DESC`;
      
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getTodayBookings = async (req, res) => {
  try {
    const query = `
      SELECT * FROM bookings 
      WHERE DATE(created_at) = CURRENT_DATE 
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching today bookings:', error);
    res.status(500).json({ error: 'Failed to fetch today\'s bookings' });
  }
};


// weekBookingController.js
const getWeekBookings = async (req, res) => {
  try {
    const query = `
      SELECT * FROM bookings 
      WHERE created_at >= DATE_TRUNC('week', CURRENT_DATE)
      AND created_at < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '1 week'
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching week bookings:', error);
    res.status(500).json({ error: 'Failed to fetch this week\'s bookings' });
  }
};


// monthBookingController.js
const getMonthBookings = async (req, res) => {
  try {
    const query = `
      SELECT * FROM bookings 
      WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)
      AND created_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching month bookings:', error);
    res.status(500).json({ error: 'Failed to fetch this month\'s bookings' });
  }
};


module.exports = {
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
};