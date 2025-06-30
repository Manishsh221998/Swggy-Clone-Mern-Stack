const express = require('express');
const router = express.Router();
const RestaurantController = require('../../controller/apiControllers/Restaurant.Controller');

router.get('/menuCategory-list', RestaurantController.listAllCategory);
 router.get('/restaurant-list', RestaurantController.listAllRestaurants);

 router.get('/restaurant-with-menu/:id', RestaurantController.getRestaurantWithMenu);
router.get('/category/:categoryId', RestaurantController.getRestaurantsByMenuCategory);

module.exports = router;
