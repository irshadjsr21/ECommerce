const express = require('express');
const router = express.Router();

const apiController = require('../../controllers/api');
const apiErrorHandler = require('../../controllers/api/errorHandler');
const adminRouter = require('./admin');

router.get('/status', apiController.status);

router.use('/admin', adminRouter);

router.use('*', apiErrorHandler.notFound);
router.use(apiErrorHandler.error);

module.exports = router;
