const express = require('express');
const router = express.Router();
const restaurantController = require('../controller/Restaurant.controller');
const restaurantImageUpload=require('../helper/restaurantImageUpload');
const AuthCheck = require('../middleware/AuthCheck');
const AuthorizeRole = require('../middleware/AuthorizeRole');

router.get('/restaurant-inventory',AuthCheck,restaurantController.inventory);
router.get('/add-restaurant',AuthCheck, restaurantController.addForm);
router.post('/add/restaurant',AuthCheck,restaurantImageUpload.single('image'),restaurantController.create);
router.get('/restaurant/edit/:id',AuthCheck, restaurantController.editForm);
router.post('/restaurant/update/:id',AuthCheck,restaurantImageUpload.single('image'),restaurantController.update);
router.get('/restaurant/delete/:id',AuthCheck,AuthorizeRole('Admin'), restaurantController.delete);

module.exports = router;
