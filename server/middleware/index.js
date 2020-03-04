const validateAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const adminErr = new Error('Restricted');
    adminErr.status = 405;
    next(adminErr);
  } else {
    next();
  }
};

module.exports = validateAdmin;
