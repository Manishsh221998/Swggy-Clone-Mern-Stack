const jwt = require("jsonwebtoken");
const transporter = require("../config/emailConfig");
require("dotenv").config();

const sendResetPasswordLinkEmail = async (user) => {
  try {
    // Create a JWT token valid for 20 minutes
    const secret = user._id + process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "20m" });

    // Construct frontend reset password link
    const resetLink = `${process.env.FRONTEND_HOST}/account/reset-password-confirm/${user._id}/${token}`;

    const subject = "Password Reset Link - EatZy (Food Delivery App)";
    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <div style="text-align: center;">
            <h1 style="color: #fc8019; margin-bottom: 10px;">EatZy</h1>
            <h3 style="color: #333;">Reset Your Password</h3>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 16px; color: #555;">Hi <strong>${user.name}</strong>,</p>
          <p style="font-size: 15px; color: #555;">
            You requested to reset your password. Click the button below to reset it. This link will expire in 20 minutes.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="display: inline-block; background: #fc8019; color: white; font-size: 16px; font-weight: bold; padding: 15px 25px; border-radius: 8px; text-decoration: none;">
              Reset Password
            </a>
          </div>
          <p style="font-size: 14px; color: #777;">
            If you didn't request this, you can ignore this email. Your password will remain unchanged.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #aaa; text-align: center;">
            Need help? Contact <a href="mailto:support@yourcompany.com" style="color: #fc8019;">support@yourcompany.com</a>
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

    console.log("Reset password email sent: %s", info.messageId);
  } catch (error) {
    console.error("Failed to send reset password email:", error);
    throw error;
  }
};

module.exports = sendResetPasswordLinkEmail;
