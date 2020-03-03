const router = require('express').Router();
const {User, Cart, Product} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      const adminErr = new Error('Restricted');
      adminErr.status = 405;
      return next(adminErr);
    }
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName', 'lastName']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

/*
{...user,
  cart: [
    { quantity: X, productId: X, product: ...product }
  ]
}
*/
router.get('/:userId', async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId, {raw: true});
    const cartItems = await Cart.findAll({
      where: {
        userId: userId
      },
      raw: true
    });
    for (let i = 0; i < cartItems.length; i++) {
      const product = await Product.findByPk(cartItems[i].productId);
      cartItems[i].product = product;
    }
    user.cart = cartItems;
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Change quantity of item in cart
router.post('/:userId', async (req, res, next) => {
  try {
    const [product, created] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        productId: req.body.productId
      }
    });
    product.quantity = req.body.quantity;
    await product.update();
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// Add or remove item(s) from cart
router.put('/:userId', async (req, res, next) => {
  try {
    const [product, created] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        productId: req.body.productId
      }
    });
    product.quantity = product.quantity + req.body.quantity;
    await product.save();
    res.json(product);
  } catch (err) {
    next(err);
  }
});
