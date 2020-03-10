const router = require('express').Router();
const {User, LineItem, Order} = require('../db/models');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      if (req.session.cart) {
        const [cartOrder, _] = await Order.findOrCreate({
          where: {
            userId: user.id,
            isCart: true
          }
        });
        for (let i = 0; i < req.session.cart.length; i++) {
          const [lineItem, created] = await LineItem.findOrCreate({
            where: {
              orderId: cartOrder.id,
              productId: req.session.cart[i].lineItem.productId
            }
          });
          if (created) {
            lineItem.quantity = req.session.cart[i].lineItem.quantity;
          } else {
            lineItem.quantity += req.session.cart[i].lineItem.quantity;
          }
          await lineItem.save();
        }
      }
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const {email, password, firstName, lastName} = req.body;
    const user = await User.create({email, password, firstName, lastName});
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', async (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
