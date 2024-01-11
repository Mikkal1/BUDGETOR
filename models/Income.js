const Income = sequelize.define('Income', {

    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    source: { type: Sequelize.STRING, allowNull: false },
    amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
    date: { type: Sequelize.DATEONLY, allowNull: false },
    user_id: { type: Sequelize.INTEGER }
  });
  
  Income.belongsTo(User);
  