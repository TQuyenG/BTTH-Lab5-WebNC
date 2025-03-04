const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getCart);
router.post('/add/:id', cartController.addToCart);
router.post('/update/:id', cartController.updateCartItem);
router.post('/remove/:id', cartController.removeCartItem);
router.post('/clear', cartController.clearCart);

module.exports = router;