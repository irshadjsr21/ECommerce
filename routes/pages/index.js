const express = require('express');
const router = express.Router();

const { ADMIN } = require('../../config');
const pagesController = require('../../controllers/pages');
const authController = require('../../controllers/pages/auth');
const pagesErrorHandler = require('../../controllers/pages/errorHandler');
const adminRoutes = require('./admin');
const authenticator = require('../../middlewares/authenticator');

router.get('/', pagesController.home);
router.get(
  '/login',
  authenticator('notLoggedIn', true),
  authController.loginPage
);
router.post(
  '/login',
  authenticator('notLoggedIn', true),
  authController.loginAction
);
router.get(
  '/signup',
  authenticator('notLoggedIn', true),
  authController.signupPage
);
router.post(
  '/signup',
  authenticator('notLoggedIn', true),
  authController.signupAction
);
router.post('/logout', authController.logout);

router.use(ADMIN.PATH, adminRoutes);
router.use('*', pagesErrorHandler.notFound);
router.use(pagesErrorHandler.error);

module.exports = router;
