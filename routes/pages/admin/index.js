const express = require('express');
const router = express.Router();

const { ADMIN } = require('../../../config');
const authenticator = require('../../../middlewares/authenticator');
const pagesController = require('../../../controllers/pages/admin');
const authController = require('../../../controllers/pages/admin/auth');
const categoryRoute = require('./category');
const productRoute = require('./product');
const userRoute = require('./user');
const addData = require('../../../middlewares/addData');

router.get(
  '/',
  authenticator('admin', true),
  addData({ name: 'dashboard' }),
  pagesController.home
);
router.use(
  '/categories',
  authenticator('admin', true),
  addData({ name: 'categories' }),
  categoryRoute
);
router.use(
  '/products',
  authenticator('admin', true),
  addData({ name: 'products' }),
  productRoute
);
router.use(
  '/users',
  authenticator('admin', true),
  addData({ name: 'users' }),
  userRoute
);

router.get(
  '/login',
  authenticator('notLoggedIn', ADMIN.PATH),
  authController.loginPage
);
router.post(
  '/login',
  authenticator('notLoggedIn', ADMIN.PATH),
  authController.loginAction
);

module.exports = router;
