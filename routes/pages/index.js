const express = require('express');
const router = express.Router();

const pagesController = require('../../controllers/pages');
const pagesErrorHandler = require('../../controllers/pages/errorHandler');

router.get('/', pagesController.home);

router.use('*', pagesErrorHandler.notFound);
router.use(pagesErrorHandler.error);

module.exports = router;
