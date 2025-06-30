 const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
    trim: true
  },

  address: {
     city: String,
    state: String,
  },

   email: String,

  image: String, // URL to restaurant logo/banner

 cuisines: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Cuisine'
}],

cuisineNames:[String],

  rating: {
    type: Number,
    default: 0
  },

  totalRatings: {
    type: Number,
    default: 0
  },
  deliveryTime: String, 
  isOpen: {
    type: Boolean,
    default: true
  },
  tags: [String],
 
},{
    versionKey:false,timestamps:true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
