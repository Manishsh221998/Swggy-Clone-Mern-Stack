const transporter = require("../config/emailConfig");
require('dotenv').config()
const sendEmailCredentials = async (user, password) => {
  try {
   

    const info = await transporter.sendMail({
      from: `"EatZy (Food Delivery App)" <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject: "Your Login Credentials - EatZy (Food Delivery App)",
      text: `Welcome to  EatZy (Food Delivery App)\n\nLogin Credentials:\nName: ${user.name}\nRole: ${user.role}\nEmail: ${user.email}\nPassword: ${password}\n\nPlease login and change your password immediately.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #e56d00;">Welcome to EatZy (Food Delivery App), ${user.name}!</h2>
          <p style="font-size: 16px;">Your account has been created successfully with the following credentials:</p>
          <table style="width: 100%; margin: 20px 0; font-size: 15px; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">Role:</td>
              <td style="padding: 8px;">${user.role}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;">${user.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Password:</td>
              <td style="padding: 8px;">${password}</td>
            </tr>
          </table>
         
          <p style="font-size: 12px; color: #888;">This email was sent to ${user.email} as part of your registration on EatZy (Food Delivery App).</p>
        </div>
      `,
    });

    console.log("Verification email sent successfully: %s", info.messageId);
  } catch (error) {
    console.error("Error sending credentials via email:", error);
    throw error;
  }
};

module.exports = sendEmailCredentials;
