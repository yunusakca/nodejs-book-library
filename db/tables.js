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
  });

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
  });

const Cart = sequelize.define('Cart', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
  });

module.exports = {
    Book: Book,
    User: User
}