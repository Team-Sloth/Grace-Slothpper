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

router.get('/:userId', validateUserOrGuest, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    const userOrders = await user.getOrders({
      where: {isCart: false},
      include: [{model: Product}]
    });
    res.json(userOrders);
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
    const productData = await Promise.all(
      products.map(async p => {
        const hasEnoughStock = await p.hasEnoughStock();
        if (!hasEnoughStock) {
          p.dataValues.hasIssue = true;
          p.dataValues.issueText =
            'Desired amount greater than stock.  Please update order';
        }
        return p;
      })
    );
    res.json(productData);
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
        p => p.lineItem && p.lineItem.productId === req.body.productId
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

    const [cartOrder, _] = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        isCart: true
      }
    });
    const [lineItem, __] = await LineItem.findOrCreate({
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
        if (req.session.cart[i].lineItem) {
          req.session.cart[i].lineItem.orderId = order.id;
          await LineItem.create(req.session.cart[i].lineItem);
        } else {
          req.session.cart[i].lineItem = {
            productId: req.body.productId,
            quantity: 1,
            orderId: order.id
          };
          await LineItem.create(req.session.cart[i].lineItem);
        }
      }
      req.session.cart = [];
      res.json(order);
      return;
    }
    const cart = await User.checkOut(req.params.userId);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

/*
  before updating order isCart to false,
  get all line items
    add line item sold price to line item

*/
