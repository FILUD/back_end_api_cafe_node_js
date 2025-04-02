const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllor');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/products', authMiddleware, productController.getProducts);
router.post('/post/product', authMiddleware, productController.createProduct)
router.get('/product/:product_id', authMiddleware, productController.getByIDProduct);
router.delete('/delete/product', authMiddleware, productController.deleteByIDProduct)
router.put('/edit/product/:product_id', authMiddleware, productController.updateProduct)

module.exports = router;
