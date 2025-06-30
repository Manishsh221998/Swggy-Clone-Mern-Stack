const express = require('express');
const router = express.Router();
const CartController = require('../../controller/apiControllers/Cart.Controller');
const AuthCheckUser = require('../../middleware/AuthCheckUser');

router.get('/menu-list',CartController.menuList)

// Get cart for authenticated user
router.get('/cart', AuthCheckUser, CartController.getCart);

// Add or update item in cart (menuItemId & quantity in body)
router.post('/add/cart', AuthCheckUser, CartController.addToCart);

// Decrease item quantity route
router.post('/cart/decrease', AuthCheckUser, CartController.decreaseItemQuantity);

// Remove item from cart (menuItemId in body)
router.post('/cart/remove-item', AuthCheckUser, CartController.removeFromCart);

// Clear cart for authenticated user
router.delete('/cart/clear', AuthCheckUser, CartController.clearCart);


module.exports = router;

