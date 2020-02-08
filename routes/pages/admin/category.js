const express = require('express');
const router = express.Router();

const pagesController = require('../../../controllers/pages/admin/category');

router.use('*', pagesController.home);

module.exports = router;
