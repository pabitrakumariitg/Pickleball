const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const courtRoutes = require('./routes/court.routes');
const bookingRoutes = require('./routes/booking.routes');
const eventRoutes = require('./routes/event.routes');
const membershipRoutes = require('./routes/membership.routes');
const businessRoutes = require('./routes/business.routes');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// File upload middleware
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
  abortOnLimit: true
}));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
// Use relaxed COOP for auth routes to allow Google OAuth popups
app.use('/api/v1/auth', helmet({
  crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
  crossOriginEmbedderPolicy: false
}));
// Default helmet for other routes
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// CORS setup
const allowedOrigins = [process.env.FRONTEND_URL, 'https://pickleball-alpha.vercel.app'];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
// Apply CORS to all API routes
app.use('/api', cors(corsOptions));
// Preflight for API routes
app.options('/api/*', cors(corsOptions));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/courts', courtRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/memberships', membershipRoutes);
app.use('/api/v1/businesses', businessRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});