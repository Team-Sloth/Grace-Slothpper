const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./product');

const LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
});

LineItem.prototype.withProductInfo = async function() {
  const product = await Product.findByPk(this.productId, {raw: true});
  return {...this.dataValues, product};
};

module.exports = LineItem;
