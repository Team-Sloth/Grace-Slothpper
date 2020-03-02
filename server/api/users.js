const router = require('express').Router();
const {User, Cart} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId);
    const cartItems = await Cart.findAll({
      where: {
        userId: userId
      }
    });
    res.json({...user, cart: cartItems});
  } catch (err) {
    next(err);
  }
});

// Add or remove item from cart
router.post('/:userId', async (req, res, next) => {
  try {
    const item = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        itemId: req.body.itemId
      }
    });
    item.quantity = req.body.quantity;
    await item.update();
    res.json(item);
  } catch (err) {
    next(err);
  }
});
