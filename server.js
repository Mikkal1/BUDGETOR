const express = require('express');
const Sequelize = require('sequelize');
const cors = require('cors'); 

const sequelize = require('./config/connection.js'); 

const app = express();

// Middlewares
app.use(express.json()); // for parsing application/json

app.use (express.static ('public'));

// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

// Define routes
app.get('/', (req, res) => res.send('Welcome to Budgetor!'));

// Error handling
app.use((err, req, res, next) => {
  // Error handling logic here
  res.status(500).send('Something broke!');
});

app.use(cors());

app.post('/calculate', (req, res) => {
  const { rate, compoundings, principal, periods } = req.body;
  const financeCalculator = new finance();
  const result = financeCalculator.CI(rate, compoundings, principal, periods);
  res.json({ result });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

