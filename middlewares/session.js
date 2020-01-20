/**
 * This initialize the session middleware
 */

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { sequelize } = require('../models');
const config = require('../config');

const store = new SequelizeStore({
  db: sequelize
});

module.exports = () =>
  session({
    secret: config.SESSION.SECRET,
    store,
    resave: false,
    proxy: true,
    saveUninitialized: false
  });
