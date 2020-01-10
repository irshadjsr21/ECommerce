const express = require('express');
const router = express.Router();

const apiController = require('../../controllers/api');
const apiErrorHandler = require('../../controllers/api/errorHandler');

router.get('/status', apiController.status);

router.use('*', apiErrorHandler.notFound);
router.use(apiErrorHandler.error);

module.exports = router;
