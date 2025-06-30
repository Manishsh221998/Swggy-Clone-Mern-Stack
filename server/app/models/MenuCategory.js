 const mongoose = require('mongoose');

const menuCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: String,
  image: String, // optional icon or banner
  createdAt: {
    type: Date,
    default: Date.now
  }
},{versionKey:false,timestamps:true});

module.exports = mongoose.model('MenuCategory', menuCategorySchema);
