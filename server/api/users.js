const router = require('express').Router();
const validateAdmin = require('../middleware');
const {User, Order, Product, LineItem} = require('../db/models');
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
// GET User profile AND Cart for Admin view
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
    const [cartOrder, cartCreated] = await Order.findOrCreate({
      where: {
        userId: userId,
        isCart: true
      }
    });
    const products = await cartOrder.getProducts({raw: true});
    const userWithCart = {...user.dataValues, cart: products};
    res.json(userWithCart);
  } catch (err) {
    next(err);
  }
});

// UPDATE Line item from Admin view
router.put('/:userId/:productId', validateAdmin, async (req, res, next) => {
  const userId = +req.params.userId;
  const productId = +req.params.productId;
  try {
    const [cartOrder, cartCreated] = await Order.findOrCreate({
      where: {
        userId: userId,
        isCart: true
      }
    });
    const [lineItem, itemCreated] = await LineItem.findOrCreate({
      where: {
        orderId: cartOrder.id
      }
    });
    lineItem.quantity = req.body.quantity;
    await lineItem.save();
    res.json(lineItem);
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
    const [cartOrder, cartCreated] = await Order.findOrCreate({
      where: {
        userId: userId,
        isCart: true
      }
    });
    const products = await cartOrder.getProducts({raw: true});

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
