const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
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
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 1.99
  },
  salePrice: {
    type: Sequelize.FLOAT,
    defaultValue: null
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/img/mask.jpg'
  }
});

module.exports = Product;
