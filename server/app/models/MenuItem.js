const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuCategory',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  image: String,
  price: {
    type: Number,
    required: true
  },
  isVeg: {
    type: Boolean,
    default: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
   rating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
 
},{versionKey:false,timestamps:true});

module.exports = mongoose.model('MenuItem', menuItemSchema);
