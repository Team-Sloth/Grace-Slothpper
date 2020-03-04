const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  date: {
    type: Sequelize.DATE
  },
  address: {
    type: Sequelize.STRING
  }
});

module.exports = Order;
