const Sequelize = require('sequelize');

const sequelize = new Sequelize('sql_training', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
  });

if (sequelize.authenticate()) {
    console.log('Connection has been established successfully.');
}

module.exports = sequelize;