const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const bookingRoutes = require('./routes/bookingRoutes');
const userAuth = require("./routes/userAuthRoute");
const user = require("./routes/userRoutes");

// Define allowed origins explicitly
const allowedOrigins = [
  'http://localhost:5173',  // Vite (Frontend)
  'http://localhost:3000',  // Common React Port
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'https://stallionsls.com',  
  'https://www.stallionsls.com'
];

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies & authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600 // Cache preflight response for 10 minutes
};

// Apply CORS Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight OPTIONS requests

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', bookingRoutes);
app.use("/auth", userAuth);
app.use("/user", user);

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS Error', message: 'Origin not allowed' });
  }
  next(err);
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
