const Sequelize = require('sequelize');

const sequelize = new Sequelize('my_db', 'admin', '.wHatisHype123.', {
    host: 'database-1.cqc4ntl04qys.eu-north-1.rds.amazonaws.com',
    dialect: 'mysql'
  });

if (sequelize.authenticate()) {
    console.log('Connection has been established successfully.');
} else {
 console.log("Couldn't connect to the database.")
}

module.exports = sequelize;