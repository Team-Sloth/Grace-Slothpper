const router = require('express').Router();
const {Order, Product, User, LineItem} = require('../db/models');
const {
  validateAdmin,
  validateUser,
  validateUserOrGuest
} = require('../middleware');
module.exports = router;

router.get('/', validateAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/cart/:userId', validateUserOrGuest, async (req, res, next) => {
  try {
    if (req.params.userId === 'undefined') {
      if (!req.session.cart) {
        req.session.cart = [];
      }
      res.json(req.session.cart);
      return;
    }
    const [cartOrder, cartCreated] = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        isCart: true
      }
    });
    const products = await cartOrder.getProducts({
      include: [{model: Order}]
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:orderId', validateAdmin, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [{model: Product}]
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// Add items to cart
router.put('/cart/:userId', validateUserOrGuest, async (req, res, next) => {
  console.log('REQ BODY IN PUT is ', req.body);
  try {
    if (req.params.userId === 'undefined') {
      // guest cart
      if (!req.session.cart) {
        req.session.cart = [];
      }
      let product = req.session.cart.find(
        p => p.lineItem.productId === req.body.productId
      );
      if (!product) {
        product = await Product.findByPk(req.body.productId, {raw: true});
        product.lineItem = {productId: req.body.productId, quantity: 0};
        req.session.cart.push(product);
      }
      product.lineItem.quantity += req.body.quantity;
      res.json(product.lineItem);
      return;
    }

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

// Delete lineItem from cart
router.delete(
  '/cart/:userId/:productId',
  validateUserOrGuest,
  async (req, res, next) => {
    try {
      if (req.params.userId === 'undefined') {
        if (!req.session.cart) {
          req.session.cart = [];
        }
        const delIdx = req.session.cart.findIndex(
          p => p.id === req.params.productId
        );
        req.session.cart.splice(delIdx, 1, 1);
        res.sendStatus(200);
        return;
      }
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
      await lineItem.save();
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
);

// Delete or reset cart post checkout
router.delete('/cart/:userId', validateUserOrGuest, async (req, res, next) => {
  try {
    if (req.params.userId === 'undefined') {
      if (!req.session.cart || req.session.cart.length === 0) {
        req.session.cart = [];
        res.sendStatus(200);
        return;
      }
      const order = await Order.create({isCart: false, date: new Date()});
      for (let i = 0; i < req.session.cart.length; i++) {
        req.session.cart[i].lineItem.orderId = order.id;
        await LineItem.create(req.session.cart[i].lineItem);
      }
      req.session.cart = [];
      res.json(order);
      return;
    }
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
