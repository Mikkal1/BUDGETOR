const User = sequelize.define('User', {

    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    
  });
  