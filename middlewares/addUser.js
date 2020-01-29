const { User } = require('../models');

module.exports = () => {
  return async (req, res, next) => {
    try {
      res.locals.isLoggedIn = false;
      res.locals.user = null;

      if (req.session.userId) {
        const user = await User.findByPk(req.session.userId);
        if (user) {
          res.locals.user = user;
          res.locals.isLoggedIn = true;
        }
      }
      res.locals.csrfToken = req.csrfToken();
    } catch (error) {
      console.log(error);
    }
    next();
  };
};
