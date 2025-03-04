const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes cho view
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductDetail);

// API routes
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;