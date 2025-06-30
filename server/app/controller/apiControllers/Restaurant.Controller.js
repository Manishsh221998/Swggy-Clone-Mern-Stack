const Restaurant = require('../../models/Restaurant');
const Menu = require('../../models/MenuItem');  
const mongoose = require('mongoose');
const MenuCategory = require('../../models/MenuCategory');
const MenuItem = require('../../models/MenuItem');

class RestaurantController {

 // List all restaurants
   async listAllCategory(req, res) {
    try {
      const category = await MenuCategory.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true,totalCount:category.length,data: category });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching restaurants', error: error.message });
    }
  }

  // List all restaurants
   async listAllRestaurants(req, res) {
    try {
      const restaurants = await Restaurant.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true,totalCount:restaurants.length,data: restaurants });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching restaurants', error: error.message });
    }
  }

 // Get single restaurant details with menu using aggregation
 async getRestaurantWithMenu(req, res) {
    try {
      const { id } = req.params;

      const restaurantId = new mongoose.Types.ObjectId(id);

      // Step 1: Get restaurant with cuisine names (exclude menu items)
      const [restaurant] = await Restaurant.aggregate([
        { $match: { _id: restaurantId } },
        {
          $lookup: {
            from: 'cuisines',
            localField: 'cuisines',
            foreignField: '_id',
            as: 'cuisineDetails'
          }
        },
        {
          $addFields: {
            cuisineNames: {
              $map: {
                input: '$cuisineDetails',
                as: 'c',
                in: '$$c.name'
              }
            }
          }
        },
        {
          $project: {
            cuisineDetails: 0 // Remove raw cuisine detail after mapping names
          }
        }
      ]);

      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: 'Restaurant not found'
        });
      }

      // Step 2: Get menu items separately
      const menuItems = await MenuItem.find({ restaurantId });

      // Final Response
      res.status(200).json({
        success: true,
        restaurant,
        menuItems
      });

    } catch (error) {
      console.error('Error in getRestaurantWithMenu:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching restaurant details',
        error: error.message
      });
    }
  }

async getRestaurantsByMenuCategory(req, res) {
  try {
    const { categoryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }

    const catId = new mongoose.Types.ObjectId(categoryId);

    // Get the category details first
    const category = await MenuCategory.findById(catId);

    // If category not found, return empty array with appropriate structure
    if (!category) {
      return res.status(200).json({
        success: true,
        category: null,
        totalRestaurants: 0,
        data: []
      });
    }

    // Fetch all restaurants having menu items in this category
    const restaurantsWithMenu = await Menu.aggregate([
      {
        $match: {
          categoryId: catId
        }
      },
      {
        $group: {
          _id: '$restaurantId',
          menuItems: { $push: '$$ROOT' }
        }
      },
      {
        $lookup: {
          from: 'restaurants',
          localField: '_id',
          foreignField: '_id',
          as: 'restaurant'
        }
      },
      {
        $unwind: '$restaurant'
      },
      {
        $replaceRoot: {
          newRoot: '$restaurant'
        }
      }
    ]);

    res.status(200).json({
      success: true,
      category: {
        _id: category._id,
        name: category.name,
        image: category.image,
        description: category.description
      },
      totalRestaurants: restaurantsWithMenu.length,
      data: restaurantsWithMenu
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching restaurants by menu category',
      error: error.message
    });
  }
}




}

module.exports =new RestaurantController;
