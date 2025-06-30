const fs = require('fs');
const path = require('path');
const Cuisine = require('../models/Cuisine');
const MenuCategory = require('../models/MenuCategory');
const User = require('../models/User');

class CuisineMenuCatController {

  // 🏠 Dashboard Page
  async dashboard(req, res) {
    try {
      const cuisines = await Cuisine.find().sort({ createdAt: -1 });
      const categories = await MenuCategory.find().sort({ createdAt: -1 });
      const userData = await User.findById(req.user.id);

      res.render('cuisine&MenuCatView', {
        cuisines,
        categories,
        data: userData,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    } catch (error) {
      req.flash('error', 'Failed to load dashboard');
      res.redirect('/');
    }
  }

  // 🍽️ Create Cuisine
  async createCuisine(req, res) {
    try {
      const { name } = req.body;
      await Cuisine.create({ name });
      req.flash('success', 'Cuisine added successfully.');
    } catch (error) {
      req.flash('error', 'Error adding cuisine: ' + error.message);
    }
    res.redirect('/cuisine-menuCategory');
  }

  //  Delete Cuisine
  async deleteCuisine(req, res) {
    try {
      await Cuisine.findByIdAndDelete(req.params.id);
      req.flash('success', 'Cuisine deleted successfully.');
    } catch (error) {
      req.flash('error', 'Failed to delete cuisine: ' + error.message);
    }
    res.redirect('/cuisine-menuCategory');
  }

  // create Menu Category with optional image upload
  async createCategory(req, res) {
    try {
      const { name, description } = req.body;
      let imagePath = '';

      if (req.file) {
        imagePath = req.file.path;
      }

      await MenuCategory.create({
        name,
        description,
        image: imagePath
      });

      req.flash('success', 'Menu category added successfully.');
    } catch (error) {
      req.flash('error', 'Error adding menu category: ' + error.message);
    }
    res.redirect('/cuisine-menuCategory');
  }

  // Delete Menu Category and image if present
  async deleteCategory(req, res) {
    try {
      const category = await MenuCategory.findById(req.params.id);
      if (!category) {
        req.flash('error', 'Menu category not found.');
        return res.redirect('/cuisine-menuCategory');
      }

      if (category.image) {
         fs.unlink(category.image, (err) => {
          if (err) console.error('Image deletion error:', err.message);
        });
      }

      await MenuCategory.findByIdAndDelete(req.params.id);
      req.flash('success', 'Menu category deleted successfully.');
    } catch (error) {
      req.flash('error', 'Failed to delete menu category: ' + error.message);
    }
    res.redirect('/cuisine-menuCategory');
  }
}

module.exports = new CuisineMenuCatController();
