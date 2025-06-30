const transporter = require("../config/emailConfig");
require("dotenv").config();

const sendWelcomeEmail = async (user) => {
  try {
    const subject = "Welcome to Swiggy - Food Delivery App";

    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <div style="text-align: center;">
            <h1 style="color: #fc8019; margin-bottom: 10px;">Welcome to Swiggy!</h1>
            <p style="color: #555; font-size: 16px;">Hi <strong>${user.name}</strong>,</p>
          </div>

          <p style="font-size: 15px; color: #555;">
            We’re excited to have you onboard at <strong>Swiggy (Food Delivery App)</strong>! Your account has been successfully verified.
          </p>

          <p style="font-size: 15px; color: #555;">
            Now you can explore our platform, order food from your favorite restaurants, or manage your account as a <strong>${user.role}</strong>.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.APP_BASE_URL || '#'}" style="background: #fc8019; color: white; text-decoration: none; padding: 12px 24px; font-size: 16px; border-radius: 6px;">
              Get Started
            </a>
          </div>

          <p style="font-size: 14px; color: #777;">
            If you have any questions, feel free to contact our support team anytime. Happy ordering!
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

          <p style="font-size: 12px; color: #aaa; text-align: center;">
            You’re receiving this email because you registered on Swiggy.<br/>
            &copy; ${new Date().getFullYear()} Swiggy (Food Delivery App)
          </p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Swiggy (Food Delivery App)" <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject,
      html
    });

    console.log("Welcome email sent: %s", info.messageId);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    throw error;
  }
};

module.exports = sendWelcomeEmail;
