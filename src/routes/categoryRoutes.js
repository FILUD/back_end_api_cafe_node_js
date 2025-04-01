const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoriesControllor');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/categories', authMiddleware, categoryController.getCategories);
router.post('/post/categories', authMiddleware, categoryController.createCategories);
router.get('/categories/:category_id', authMiddleware, categoryController.getByIDCategories);
router.delete('/delete/categories', authMiddleware, categoryController.deleteByIDCategories)
router.put('/edit/categories/:category_id', authMiddleware, categoryController.updateCategory)

module.exports = router;
