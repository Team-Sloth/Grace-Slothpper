const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./product');
const LineItem = require('./line-item');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password');
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt');
    }
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  googleId: {
    type: Sequelize.STRING
  }
  // stripe metadata https://stripe.com/docs/api/metadata
  // shipping: {
  //   address: {
  //   city: "pittsburgh",
  //   country: "US",
  //   line1: "127001 ipv4 st",
  //   line2: "port 80",
  //   postal_code: "15232",
  //   state: "pa"
  //   },

  // getFullAddress() {
  //   return [this.street, this.apartment, this.city, this.state, this.postal_code].join(' ');
  // }
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.getCart = async function(userId) {
  const user = await this.findByPk(userId);
  const cart = await user.getOrders({
    where: {
      isCart: true
    },
    include: [{model: Product}]
  });
  return cart[0];
};

User.checkOut = async function(userId) {
  const cart = await this.getCart(userId);
  const lineItemsQuery = await LineItem.findAll({
    where: {
      orderId: cart.id
    }
  });
  // update the cart items with the sold price
  await Promise.all(
    lineItemsQuery.map(async item => {
      const itemWithProduct = await item.withProductInfo();
      item.soldPrice = itemWithProduct.product.price;
      await item.save();
      return itemWithProduct;
    })
  );
  // mark order as complete via isCart
  cart.isCart = false;
  cart.date = new Date();
  await cart.save();
  return cart;
};

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword);
});
