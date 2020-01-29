const express = require('express');
const router = express.Router();

const { ADMIN } = require('../../../config');
const authenticator = require('../../../middlewares/authenticator');
const pagesController = require('../../../controllers/pages/admin');
const authController = require('../../../controllers/pages/admin/auth');

router.get('/', authenticator('admin', true), pagesController.home);
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
