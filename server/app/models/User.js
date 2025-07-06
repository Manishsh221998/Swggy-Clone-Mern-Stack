// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [4, 'Password must be at least 4 characters'],
      select: false, // hide password by default when querying
    },
    mobile:{
      type :Number
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
       ref: 'roles',
    },
    role:{
      type:String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String, 
     },
     address: [
      {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zipCode: { type: String, trim: true },
        }
    ],
 
  },
  { timestamps: true,versionKey:false }
);

 

module.exports = mongoose.model('User', userSchema);
