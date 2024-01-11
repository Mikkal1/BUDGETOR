const Category = sequelize.define('Category', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
    user_id: { type: Sequelize.INTEGER, allowNull: false }
  });
  
  Category.belongsTo(User, { foreignKey: 'user_id' });
  User.hasMany(Category, { foreignKey: 'user_id' });
  