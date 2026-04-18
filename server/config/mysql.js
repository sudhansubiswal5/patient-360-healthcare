const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ MySQL connected'))
  .catch((err) => console.error('❌ MySQL error:', err));

sequelize.sync({ alter: false })
  .catch((err) => console.error('❌ Sync error:', err));

module.exports = sequelize;
