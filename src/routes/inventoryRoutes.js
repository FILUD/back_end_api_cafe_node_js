const express = require('express');
const router = express.Router();
const inventoryControllor = require('../controllers/inventoryControllor');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/inventory', authMiddleware, inventoryControllor.getInventory);
// router.post('/post/product', authMiddleware, productController.createProduct)
// router.get('/product/:product_id', authMiddleware, productController.getByIDProduct);
// router.delete('/delete/product', authMiddleware, productController.deleteByIDProduct)
// router.put('/edit/product/:product_id', authMiddleware, productController.updateProduct)

module.exports = router;
