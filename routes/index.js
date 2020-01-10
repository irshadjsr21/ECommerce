const express = require('express');
const router = express.Router();

const pageRoutes = require('./pages');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', pageRoutes);

module.exports = router;
