const express = require('express');
const router = express.Router();

const pagesController = require('../../../controllers/pages/admin/user');

router.get('/', pagesController.home);

module.exports = router;
