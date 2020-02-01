const express = require('express');
const router = express.Router();

const pagesController = require('../../../controllers/pages/admin/category');

router.get('/', pagesController.home);
router.get('/new', pagesController.addCategory);
router.post('/new', pagesController.addCategoryAction);

module.exports = router;
