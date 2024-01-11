const Expense = sequelize.define('Expense', {

    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    description: { type: Sequelize.STRING },
    amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
    date: { type: Sequelize.DATEONLY, allowNull: false },
    category_id: { type: Sequelize.INTEGER },
    user_id: { type: Sequelize.INTEGER }
    
  });

  Expense.belongsTo(User);
  