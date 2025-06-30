const transporter = require("../config/emailConfig");
require("dotenv").config();

const sendOrderConfirmationEmail = async (user, order) => {
  try {
    const subject = "Your Order Confirmation – Swiggy";

    const itemsHtml = order.items.map((item, index) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px;">${index + 1}</td>
        <td style="padding: 10px;">${item.name}</td>
        <td style="padding: 10px;">${item.quantity}</td>
        <td style="padding: 10px;">₹${item.price}</td>
      </tr>
    `).join('');

    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <div style="text-align: center;">
            <h2 style="color: #fc8019;">Order Confirmation</h2>
            <p style="font-size: 16px;">Hi <strong>${user.name}</strong>,</p>
          </div>

          <p style="font-size: 15px; color: #555;">
            Thank you for your order from <strong>Swiggy</strong>! Below are the details of your order placed on <strong>${new Date(order.createdAt).toLocaleString()}</strong>.
          </p>

<h4 style="margin-top: 20px;">Order ID: <span style="color: #555;">#ORD${order._id.toString().slice(-6).toUpperCase()}</span></h4>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead style="background-color: #f2f2f2;">
              <tr>
                <th style="padding: 10px;">#</th>
                <th style="padding: 10px;">Item</th>
                <th style="padding: 10px;">Quantity</th>
                <th style="padding: 10px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="text-align: right; margin-top: 20px;">
            <p style="font-size: 16px;"><strong>Total Amount: ₹${order.totalAmount}</strong></p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.APP_BASE_URL || '#'}" style="background: #fc8019; color: white; text-decoration: none; padding: 12px 24px; font-size: 16px; border-radius: 6px;">
              View Your Order
            </a>
          </div>

          <p style="font-size: 14px; color: #777;">
            Your order status is currently: <strong>${order.status}</strong>.<br/>
            You will receive updates once your order is out for delivery.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

          <p style="font-size: 12px; color: #aaa; text-align: center;">
            You’re receiving this email because you placed an order on Swiggy.<br/>
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

    console.log("Order confirmation email sent: %s", info.messageId);
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
    throw error;
  }
};

module.exports = sendOrderConfirmationEmail;
