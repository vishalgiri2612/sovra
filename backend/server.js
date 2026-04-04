const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// Middleware
app.use(cors()); // Allow cross-origin requests from frontend
app.use(express.json()); // Body parser for JSON data

// Basic Route
app.get('/', (req, res) => {
  res.send('SOVRA SOVRA API is running...');
});

// Import and use routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const bespokeRoutes = require('./routes/bespokeRoutes');
const materialRoutes = require('./routes/materialRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/bespoke', bespokeRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/analytics', analyticsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
