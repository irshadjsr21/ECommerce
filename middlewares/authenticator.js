const { User } = require('../models');

const authenticators = {
  notLoggedIn: (req, res) => {
    return !res.locals.isLoggedIn;
  },
  user: (req, res) => {
    return res.locals.isLoggedIn;
  },
  admin: (req, res) => {
    if (res.locals.isLoggedIn && res.locals.user) {
      return res.locals.user.type == User.TYPES.admin;
    }
    return false;
  }
};

/**
 * Returns authenticator middleware
 * @param {'user'|'admin'|'notLoggedIn'} type The type of authenticator required
 * @param {Boolean|String} doRedirect If set to `false` returns json error else redirects to `/` or to the url specified.u
 */
const authFunction = (type, doRedirect) => {
  if (!authenticators[type]) {
    throw new Error('Invalid parameter.');
  }

  return (req, res, next) => {
    if (!authenticators[type](req, res)) {
      if (doRedirect) {
        if (typeof doRedirect == 'string') res.redirect(doRedirect);
        res.redirect('/');
      } else {
        res.status(401).json({ error: 'Unauthorized.' });
      }
      return;
    }
    next();
  };
};

module.exports = authFunction;
