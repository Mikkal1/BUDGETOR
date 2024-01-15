const express = require('express');
const sequelize = require('./config/connection'); // Add my actual path to Sequelize configuration

const app = express();

// Middlewares
app.use(express.json()); // for parsing application/json

// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

// Define routes
app.get('/', (req, res) => res.sendFile(__dirname + '/Mainpage.html'));

// Error handling
app.use((err, req, res, next) => {
  // Error handling logic
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
