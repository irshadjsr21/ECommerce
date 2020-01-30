const express = require('express');
const router = express.Router();

const pagesController = require('../../../controllers/pages/admin/product');

router.get('/', pagesController.home);

module.exports = router;
