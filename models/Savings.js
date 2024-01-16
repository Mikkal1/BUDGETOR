const Sequelize = require('sequelize'); 

const Savings = sequelize.define('Savings', {
  // Assuming an auto-generated ID
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2), // Adjust the precision as needed
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

}, );

module.exports = Savings
