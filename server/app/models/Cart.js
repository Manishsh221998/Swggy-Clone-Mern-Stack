const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    items: [
      {
        menuItemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MenuItem',
          required: true
        },
        name: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        price: {
          type: Number,
          required: true
        },
        isVeg: {
          type: Boolean,
         },
        image: {
          type: String,
         },
        
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('Cart', cartSchema);
