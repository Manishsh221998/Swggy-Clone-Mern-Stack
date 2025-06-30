const express = require('express');
const router = express.Router();
const CuisineMenuCatController = require('../controller/Cuisine&MenuCat.Controller');
const AuthCheck = require('../middleware/AuthCheck');
const AuthorizeRole = require('../middleware/AuthorizeRole');
const menuCategoryImageUpload = require('../helper/menuCatImageUpload');

// Dashboard
router.get('/cuisine-menuCategory',AuthCheck,CuisineMenuCatController.dashboard);

// Cuisine actions
router.post('/cuisine/create', CuisineMenuCatController.createCuisine);
router.get('/cuisine/delete/:id',AuthCheck,AuthorizeRole('Admin'), CuisineMenuCatController.deleteCuisine);

// MenuCategory actions
router.post('/menu-categories/create',menuCategoryImageUpload.single('image'),CuisineMenuCatController.createCategory);
router.get('/menu-categories/delete/:id',AuthCheck,AuthorizeRole('Admin'), CuisineMenuCatController.deleteCategory);

module.exports = router;
