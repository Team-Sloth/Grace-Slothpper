const router = require('express').Router();
const {Order, Product, User, LineItem} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      const adminErr = new Error('Restricted');
      adminErr.status = 405;
      next(adminErr);
      return;
    }
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/cart/:userId', async (req, res, next) => {
  try {
    const [cartOrder, cartCreated] = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        isCart: true
      }
    });
    const products = await cartOrder.getProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [
        {
          model: Product
        }
      ]
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// Add items to cart
router.put('/cart/:userId', async (req, res, next) => {
  try {
    const [cartOrder, cartCreated] = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        isCart: true
      }
    });
    const [lineItem, created] = await LineItem.findOrCreate({
      where: {
        orderId: cartOrder.id,
        productId: req.body.productId
      }
    });
    lineItem.quantity = lineItem.quantity + req.body.quantity;
    await lineItem.save();
    res.json(lineItem);
  } catch (err) {
    next(err);
  }
});

// Add or remove item(s) from order
router.put('/:orderId', async (req, res, next) => {
  try {
    const [lineItem, created] = await LineItem.findOrCreate({
      where: {
        orderId: req.params.orderId,
        productId: req.body.productId
      }
    });
    lineItem.quantity = lineItem.quantity + req.body.quantity;
    await lineItem.save();
    res.json(lineItem);
  } catch (err) {
    next(err);
  }
});

// Delete or reset cart post checkout
router.delete('/cart/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const cartOrders = await user.getOrders({
      where: {
        isCart: true
      }
    });
    cartOrders[0].isCart = false;
    cartOrders[0].date = new Date();
    await cartOrders[0].save();
    res.json(cartOrders[0]);
  } catch (err) {
    next(err);
  }
});

// Delete lineItem from cart
router.delete('/cart/:userId/:productId', async (req, res, next) => {
  try {
    const [cartOrder, cartCreated] = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        isCart: true
      }
    });
    const [lineItem, created] = await LineItem.findOrCreate({
      where: {
        orderId: cartOrder.id,
        productId: req.params.productId
      }
    });
    await lineItem.destroy();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
