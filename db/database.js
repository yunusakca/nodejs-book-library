const Sequelize = require('sequelize');

const sequelize = new Sequelize('sql7620068', 'sql7620068', '2y5yuY44mQ', {
    host: 'sql7.freesqldatabase.com',
    dialect: 'mysql'
  });

if (sequelize.authenticate()) {
    console.log('Connection has been established successfully.');
}

module.exports = sequelize;