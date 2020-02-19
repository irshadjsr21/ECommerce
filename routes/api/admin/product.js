const express = require('express');
const router = express.Router();

const productController = require('../../../controllers/api/admin/product');

router.post('/', productController.add);
router.get('/', productController.list);

module.exports = router;
