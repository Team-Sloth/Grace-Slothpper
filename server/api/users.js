const router = require('express').Router();
const validateAdmin = require('../middleware');
const {User, Order} = require('../db/models');
module.exports = router;

router.get('/', validateAdmin, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      const adminErr = new Error('Restricted');
      adminErr.status = 405;
      next(adminErr);
      return;
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

router.get('/:userId/profile', async (req, res, next) => {
  const userId = req.params.userId;
  try {
    if (!req.user || (!req.user.isAdmin && req.user.id !== userId)) {
      const adminErr = new Error('Restricted');
      adminErr.status = 405;
      return next(adminErr);
    }
    const user = await User.findByPk(userId);
    res.json(user);
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
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Order
        }
      ]
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Change quantity of item in cart
// restful APIs representational state transfer - API architecture
// focus on restful API practices
// naming convention is not clear: does not represent what it does
// changes in cart /cart is more representative
// find or create for cart because you do not know if it exists
// add something to cart is add a new row to a table
// add products in many to many will add twice the lineItem
// if you do one to many then use set product bc i am changing an id
// user/id/cart
// cart/cartId

