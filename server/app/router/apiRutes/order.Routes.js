const express = require('express');
const router = express.Router();
const OrderController = require('../../controller/apiControllers/Order.Controller');
const AuthCheckUser = require('../../middleware/AuthCheckUser');  
const AuthCheck = require('../../middleware/AuthCheck');
const authorizeRole = require('../../middleware/AuthorizeRole');

router.get('/order/place-order', AuthCheckUser, OrderController.placeOrder);
router.get('/orders',AuthCheckUser, OrderController.getAllOrders);

router.post("/razorpay/create-order", AuthCheckUser, OrderController.createRazorpayOrder);
router.post("/razorpay/verify", AuthCheckUser, OrderController.verifyPaymentAndPlaceOrder);

router.get('/orders/table',AuthCheck, OrderController.table);

 router.post('/orders/update-status',AuthCheck,authorizeRole('Admin','Employee'), OrderController.updateStatus);

module.exports = router;

