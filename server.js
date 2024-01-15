const express = require('express');
const mysql = require('mysql');
const Sequelize = require('sequelize');
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection.js'); 

const app = express();

// Middlewares
app.use(express.json()); // for parsing application/json

// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

// Define routes
app.get('/', (req, res) => res.send('Welcome to the Budgetor API!'));

// Error handling
app.use((err, req, res, next) => {
  // Error handling logic
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

const db = mysql.createConnection( 
{
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'budgetor_db'
},
console.log('Connected to the budgetor_db database.')
);

db.connect(err => {
  if (err) {
    console.error('Error connecting to the budgetor_db database: ' + err.stack);
    return;
  }
  console.log('Connected to the budgetor_db database.');
});
