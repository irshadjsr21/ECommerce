/**
 * This will return all the essential middleware to
 * initialize the server.
 */

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const csurf = require('csurf');

const session = require('./session');

module.exports = [
  logger('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  csurf({
    cookie: true
  }),
  express.static(path.join(__dirname, '../', 'public')),
  session(),
  (req, res, next) => {
    if (req.session.userId) {
      res.locals.isLoggedIn = true;
    }
    res.locals.csrfToken = req.csrfToken();
    next();
  }
];
