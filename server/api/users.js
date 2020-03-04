const router = require('express').Router();
const {User, Order} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
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
