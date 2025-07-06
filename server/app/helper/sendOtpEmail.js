const transporter = require("../config/emailConfig");
const Otp = require("../models/Otp");
require("dotenv").config();

const sendOtpEmail = async (user) => {
  try {
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.create({
      user: user._id,
      otp: otpCode,
      expiresAt
    });

    const subject = "Your OTP Code - EatZy (Food Delivery App)";
    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <div style="text-align: center;">
            <h1 style="color: #fc8019; margin-bottom: 10px;">EatZy</h1>
            <h3 style="color: #333;">OTP Verification</h3>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 16px; color: #555;">Hi <strong>${user.name}</strong>,</p>
          <p style="font-size: 15px; color: #555;">
            To proceed with your account verification on <strong>EatZy (Food Delivery App)</strong>, please use the following One-Time Password (OTP):
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; background: #fc8019; color: white; font-size: 30px; font-weight: bold; padding: 15px 30px; border-radius: 10px;">
              ${otpCode}
            </div>
          </div>
          <p style="font-size: 14px; color: #777;">
            This OTP is valid for <strong>5 minutes</strong>. Please do not share this code with anyone for security reasons.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #aaa; text-align: center;">
            You received this email because your email address is registered with EatZy. If you did not request this OTP, please ignore this email.
          </p>
          <p style="text-align: center; font-size: 12px; color: #aaa;">&copy; ${new Date().getFullYear()} EatZy (Food Delivery App)</p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"EatZy (Food Delivery App)" <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject,
      html
    });

    console.log("OTP email sent: %s", info.messageId);
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    throw error;
  }
};

module.exports = sendOtpEmail;
