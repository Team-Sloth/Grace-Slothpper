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

Order.ensureValidOrder = async function(orderId) {
  const lineItems = await Order.getLineItems(orderId);
  const inStockItems = await Promise.all(
    lineItems.map(async item => {
      const isInStock = await item.validateInstock();
      return isInStock;
    })
  );
  return lineItems.length === inStockItems.filter(item => !!item).length;
};

module.exports = Order;
