const Sequelize = require('sequelize');
const db = require('../db');
const LineItem = require('./line-item');
const moment = require('moment');

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  date: {
    type: Sequelize.DATE,
    get: function() {
      return moment(this.getDataValue('date')).format('MMMM Do, YYYY');
    }
  },
  address: {
    type: Sequelize.STRING
  }
});

Order.getLineItems = async function(orderId) {
  const lineItems = await LineItem.findAll({
    where: {
      orderId: orderId
    }
  });
  return lineItems;
};

module.exports = Order;
