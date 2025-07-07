const express = require('express');
const router = express.Router();
const menuController = require('../controller/Menu.Controller'); 
const menuImageUpload = require('../helper/menuImageUpload'); 
const AuthCheck = require('../middleware/AuthCheck');
const AuthorizeRole = require('../middleware/AuthorizeRole');

// List all menu items
router.get('/menu-inventory', AuthCheck, menuController.inventory);

// Show form to add a new menu item
router.get('/add-menu', AuthCheck, menuController.addForm);

// Handle creating a new menu item
router.post('/add/menu', AuthCheck, menuImageUpload.single('image'), menuController.create);

// Show form to edit a menu item
router.get('/menu/edit/:id', AuthCheck, menuController.editForm);

// Handle updating a menu item
router.post('/menu/update/:id', AuthCheck, menuImageUpload.single('image'), menuController.update);

// Delete a menu item (only Admin can delete)
router.get('/menu/delete/:id', AuthCheck, AuthorizeRole('Admin'), menuController.delete);

module.exports = router;
