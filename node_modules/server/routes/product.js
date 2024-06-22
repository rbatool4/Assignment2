const express = require('express');
const router = express.Router();
//const authMiddleware = require('../middlewares/auth');
const productController = require('../controllers/product');

// Define routes and map to controller functions
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.delete('/', productController.deleteAllProducts);

module.exports = router;
