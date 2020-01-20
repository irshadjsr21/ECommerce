const express = require('express');
const router = express.Router();

const pagesController = require('../../controllers/pages');
const authController = require('../../controllers/pages/auth');
const pagesErrorHandler = require('../../controllers/pages/errorHandler');

router.get('/', pagesController.home);
router.get('/login', authController.loginPage);
router.post('/login', authController.loginAction);
router.get('/signup', authController.signupPage);
router.post('/signup', authController.signupAction);
router.post('/logout', authController.logout);

router.use('*', pagesErrorHandler.notFound);
router.use(pagesErrorHandler.error);

module.exports = router;
