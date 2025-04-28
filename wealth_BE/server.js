require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const assetRoutes = require('./src/routes/assetRoutes');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

// Routes
app.get('/', (req, res) => res.send('API is running'));
app.use('/api/assets', assetRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
