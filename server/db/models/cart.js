const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  userId: {
    type: Sequelize.INTEGER
  },
  productId: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  }
});

module.exports = Cart;
