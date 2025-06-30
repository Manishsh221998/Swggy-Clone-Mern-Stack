const Restaurant = require('../models/Restaurant');
const Cuisine = require('../models/Cuisine');
const User = require('../models/User');
 const path = require('path');
const fs = require('fs');

class RestaurantController {
  // List with optional search
async inventory(req, res) {
  try {
    const userData = await User.findById(req.user.id);
    const search = req.query.search || '';
    const regex = new RegExp(search, 'i');

    const restaurants = await Restaurant.find({
      $or: [
        { name: { $regex: regex } },
        { email: { $regex: regex } },
        { 'address.city': { $regex: regex } }
      ]
    });

    res.render('restaurantInventory', {
      restaurants,
      search,
      data: userData,
      message: req.flash('success'),
      error: req.flash('error')
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error loading restaurants.');
    res.redirect('/add-restaurant');
  }
}


  // Show add form
  async addForm(req, res) {
    try {
      const userData = await User.findById(req.user.id);
      const Cuisines = await Cuisine.find();
      res.render('restaurantAddFrom', {
        Cuisines,
        data: userData,
         message: req.flash('success'),
        error: req.flash('error')
      });
    } catch (error) {
      req.flash('error', 'Error loading add form.');
      res.redirect('/add-restaurant');
    }
  }

  // Create restaurant

async create(req, res) {
  try {
    const { name, email, address, deliveryTime, cuisines, tags } = req.body;

    // Handle image upload (assuming you're using multer and file is saved in req.file)
    let imagePath = '';
    if (req.file) {
      imagePath =req.file.path;  
    }

    // Normalize cuisines (can be single or array depending on how many are selected)
    const cuisineIds = Array.isArray(cuisines) ? cuisines : [cuisines];

    // Fetch cuisine names from Cuisine model
    const cuisineDocs = await Cuisine.find({ _id: { $in: cuisineIds } });
    const cuisineNames = cuisineDocs.map(c => c.name);

    // Normalize tags
    const tagArray = Array.isArray(tags) ? tags : [tags];

    const newRestaurant = new Restaurant({
      name,
      email,
      address,
      image: imagePath,
      cuisines: cuisineIds,
      cuisineNames,
      deliveryTime,
      tags: tagArray,
    });

    await newRestaurant.save();

    req.flash('success', 'Restaurant added successfully!');
    res.redirect('/restaurant-inventory');

  } catch (err) {
    console.error(err);
    req.flash('error', 'Error creating restaurant.');
    res.redirect('/add-restaurant');
  }
}


  // Show edit form
 async editForm(req, res) {
  try {
    const userData = await User.findById(req.user.id);
    const restaurant = await Restaurant.findById(req.params.id);
    const cuisines = await Cuisine.find();

    if (!restaurant) {
      req.flash('error', 'Restaurant not found.');
      return res.redirect('/restaurant-inventory');
    }

    res.render('restaurantEditFrom', {
      restaurant,
      cuisines,
      data: userData,
      message: req.flash('success'),
      error: req.flash('error')
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error loading edit form.');
    res.redirect('/restaurant-inventory');
  }
}


  // Update restaurant
async update(req, res) {
  try {
    const { name, email, address, deliveryTime, cuisines, tags } = req.body;

    // Normalize cuisines and tags
    const cuisineIds = Array.isArray(cuisines) ? cuisines : [cuisines];
    const tagArray = Array.isArray(tags) ? tags : [tags];

    // Get cuisine names from DB
    const cuisineDocs = await Cuisine.find({ _id: { $in: cuisineIds } });
    const cuisineNames = cuisineDocs.map(c => c.name);

    // Fetch restaurant
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      req.flash('error', 'Restaurant not found.');
      return res.redirect('/restaurant-inventory');
    }

    // Handle image replacement
    if (req.file) {
      // Delete old image if it exists
      if (restaurant.image) {
        const oldImagePath =  restaurant.image;
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      restaurant.image = req.file.path;
    }

    // Update other fields
    restaurant.name = name;
    restaurant.email = email;
    restaurant.address = address;
    restaurant.deliveryTime = deliveryTime;
    restaurant.cuisines = cuisineIds;
    restaurant.cuisineNames = cuisineNames;
    restaurant.tags = tagArray;

    await restaurant.save();

    req.flash('success', 'Restaurant updated successfully!');
    res.redirect('/restaurant-inventory');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error updating restaurant.');
    res.redirect(`/restaurant/edit/${req.params.id}`);
  }
}



  // Delete restaurant
  async delete(req, res) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      req.flash('error', 'Restaurant not found.');
      return res.redirect('/restaurant-inventory');
    }

    // Delete image file if it exists
    if (restaurant.image) {
       if (fs.existsSync(restaurant.image)) {
        fs.unlinkSync(restaurant.image);
      }
    }

    // Delete restaurant record
    await Restaurant.findByIdAndDelete(req.params.id);

    req.flash('success', 'Restaurant deleted successfully!');
    res.redirect('/restaurant-inventory');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error deleting restaurant.');
    res.redirect('/restaurant-inventory');
  }
}
}

module.exports = new RestaurantController();
