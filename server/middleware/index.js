module.exports = {
  validateAdmin: (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
      const adminErr = new Error('Restricted');
      adminErr.status = 405;
      next(adminErr);
    } else {
      next();
    }
  },
  validateUser: (req, res, next) => {
    const userId = parseInt(req.params.userId);
    if (!req.user || (req.user.id !== userId && !req.user.isAdmin)) {
      const cartAccessErr = new Error('Restricted');
      cartAccessErr.status = 405;
      next(cartAccessErr);
    } else {
      next();
    }
  },
  validateUserOrGuest: (req, res, next) => {
    // check needs to be against a string
    if (req.params.userId === 'undefined') {
      return next();
    }
    const userId = parseInt(req.params.userId);
    if (
      (!req.user && userId !== undefined) ||
      (req.user.id !== userId && !req.user.isAdmin)
    ) {
      const cartAccessErr = new Error('Restricted');
      cartAccessErr.status = 405;
      next(cartAccessErr);
    } else {
      next();
    }
  }
};
