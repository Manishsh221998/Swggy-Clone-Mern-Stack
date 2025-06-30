const nodemailer = require("nodemailer");
const dotenv=require('dotenv')
dotenv.config()

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports=transporter