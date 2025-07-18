const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    otp: {
        type: String,
        required: true
    }

},{versionKey:false,timestamps:true});

module.exports = mongoose.model('Otp', otpSchema);
