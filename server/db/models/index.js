const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const LineItem = require('./line-item');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Order);

Order.belongsToMany(Product, {through: LineItem});
//Product.belongsToMany(Order, {through: LineItem});

/**
 * We'll exp ort all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  LineItem
};
