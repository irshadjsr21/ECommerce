const express = require('express');
const router = express.Router();

const categoryController = require('../../../controllers/api/admin/category');

router.post('/', categoryController.add);
router.get('/parent-options', categoryController.getParentOptions);

module.exports = router;
