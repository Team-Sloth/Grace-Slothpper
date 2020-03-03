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

// For reference, these are the methods to grab / query from the database.

// const User = db.model('user');
// const Product = db.model('product');

// Cart.getUserId = (id) => {
//   return Cart.findAll({
//     where: { userId: id },
//     include: [{
//       model: User,
//       as: 'user'
//     }]
//   })
// };

// Cart.getProductId = (id) => {
//   return Cart.findAll({
//     where: { productId: id },
//     include: [{
//       model: Product,
//       as: 'product'
//     }]
//   })
// };
