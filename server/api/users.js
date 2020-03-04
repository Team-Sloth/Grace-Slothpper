const router = require('express').Router();
const validateAdmin = require('../middleware');
const {User, Order} = require('../db/models');
module.exports = router;

router.get('/', validateAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
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

router.put('/:userId', validateAdmin, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const {email, firstName, lastName} = req.body;
    const userData = {email, firstName, lastName};
    const [count, user] = await User.update(userData, {
      where: {id: userId},
      returning: true
    });
    const [foundUser] = user;
    res.json(foundUser);
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
