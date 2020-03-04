const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  sku: {
    type: Sequelize.BIGINT,
    allowNull: false,
    defaultValue: 2258119111
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'This is a description for this sloth product!'
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 199
  },
  // add utility method to dive by 100
  salePrice: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/img/mask.jpg'
  }
});

module.exports = Product;
