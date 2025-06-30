const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');
const MenuCategory = require('../models/MenuCategory');
const User = require('../models/User');
const fs = require('fs');

class MenuController {
  // List all menu items with optional search
  async inventory(req, res) {
    try {
      const userData = await User.findById(req.user.id);
      const search = req.query.search || '';
      const regex = new RegExp(search, 'i');

      const menuItems = await MenuItem.find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } }
        ]
      }).populate('restaurantId categoryId');

      res.render('menuInventory', {
        menuItems,
        search,
        data: userData,
        message: req.flash('success'),
        error: req.flash('error')
      });
    } catch (err) {
      console.error(err);
      req.flash('error', 'Error loading menu items.');
      res.redirect('/');
    }
  }

  // Show add form
  async addForm(req, res) {
    try {
      const userData = await User.findById(req.user.id);
      const restaurants = await Restaurant.find();
      const categories = await MenuCategory.find();
      res.render('menuAddFrom', {
        restaurants,
        categories,
        data: userData,
        message: req.flash('success'),
        error: req.flash('error')
      });
    } catch (err) {
      req.flash('error', 'Error loading add form.');
      res.redirect('/menu-inventory');
    }
  }

  // Create menu item
  async create(req, res) {
    try {
      const { name, description, price, isVeg, isAvailable, restaurantId, categoryId } = req.body;
      let imagePath = '';

      if (req.file) {
        imagePath = req.file.path;
      }

      const newItem = new MenuItem({
        name,
        description,
        price,
        isVeg: isVeg === 'true',
        isAvailable: isAvailable === 'true',
        image: imagePath,
        restaurantId,
        categoryId
      });

      await newItem.save();

      req.flash('success', 'Menu item added successfully!');
      res.redirect('/menu-inventory');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Error adding menu item.');
      res.redirect('/menu/add');
    }
  }

  // Show edit form
  async editForm(req, res) {
    try {
      const userData = await User.findById(req.user.id);
      const item = await MenuItem.findById(req.params.id);
      const restaurants = await Restaurant.find();
      const categories = await MenuCategory.find();

      if (!item) {
        req.flash('error', 'Menu item not found.');
        return res.redirect('/menu-inventory');
      }

      res.render('menuEditFrom', {
        item,
        restaurants,
        categories,
        data: userData,
        message: req.flash('success'),
        error: req.flash('error')
      });
    } catch (err) {
      console.error(err);
      req.flash('error', 'Error loading edit form.');
      res.redirect('/menu-inventory');
    }
  }

  // Update menu item
  async update(req, res) {
    try {
      const { name, description, price, isVeg, isAvailable, restaurantId, categoryId } = req.body;
      const item = await MenuItem.findById(req.params.id);

      if (!item) {
        req.flash('error', 'Menu item not found.');
        return res.redirect('/menu-inventory');
      }

      if (req.file) {
        if (item.image && fs.existsSync(item.image)) {
          fs.unlinkSync(item.image);
        }
        item.image = req.file.path;
      }

      item.name = name;
      item.description = description;
      item.price = price;
      item.isVeg = isVeg === 'true';
      item.isAvailable = isAvailable === 'true';
      item.restaurantId = restaurantId;
      item.categoryId = categoryId;

      await item.save();

      req.flash('success', 'Menu item updated successfully!');
      res.redirect('/menu-inventory');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Error updating menu item.');
      res.redirect(`/menu/edit/${req.params.id}`);
    }
  }

  // Delete menu item
  async delete(req, res) {
    try {
      const item = await MenuItem.findById(req.params.id);

      if (!item) {
        req.flash('error', 'Menu item not found.');
        return res.redirect('/menu-inventory');
      }

      if (item.image && fs.existsSync(item.image)) {
        fs.unlinkSync(item.image);
      }

      await MenuItem.findByIdAndDelete(req.params.id);

      req.flash('success', 'Menu item deleted successfully!');
      res.redirect('/menu-inventory');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Error deleting menu item.');
      res.redirect('/menu-inventory');
    }
  }
}

module.exports = new MenuController();
