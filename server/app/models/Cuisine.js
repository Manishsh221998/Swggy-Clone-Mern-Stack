const mongoose = require('mongoose');

const cuisineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  } 
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Cuisine', cuisineSchema);
