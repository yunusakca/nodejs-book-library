const Sequelize = require('sequelize');

const sequelize = require('./database')

const Book = sequelize.define('Book', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    
    bookName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bookPrice: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    bookDescription: {
        type: Sequelize.TEXT('long'),
        allowNull: false
    },

    bookImg: {
      type: Sequelize.STRING,
      allowNull: false
    },

    bookAuthor: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
  },
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });

module.exports = {
    Book: Book,
    User: User
}