const express = require('express');
const router = express.Router();

const categoryController = require('../../../controllers/api/admin/category');

router.post('/', categoryController.add);
router.get('/', categoryController.list);
router.get('/parent-options', categoryController.getParentOptions);
router.get('/level-options', categoryController.getLevels);

module.exports = router;
