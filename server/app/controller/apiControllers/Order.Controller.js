const Cart = require('../../models/Cart');
const Order = require('../../models/Order');
const User = require('../../models/User');
const Razorpay = require('razorpay');
const crypto =require('crypto')
const sendOrderConfirmationEmail=require('../../helper/sendOrderConfirmationEmail')


 class OrderController {

  async placeOrder(req, res) {
    try {
      const userId = req.user.id;

      // 1. Get user's cart
      const cart = await Cart.findOne({ userId });
      if (!cart || !cart.items || cart.items.length === 0) {
        return res.status(400).json({ success: false, message: 'Cart is empty' });
      }

      // 2. Prepare order items
      const orderItems = cart.items.map(item => ({
        menuItemId: item.menuItemId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      // 3. Calculate total
      const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);

      // 4. Create order
      const order = new Order({
        userId,
        restaurantId: cart.restaurantId,
        items: orderItems,
        totalAmount
      });

      await order.save();

      // 5. Optionally clear the cart
      cart.items = [];
      await cart.save();

       // 6. Send confirmation email
      const user = await User.findById(userId);
      if (user) {
        await sendOrderConfirmationEmail(user, order);
      }
      
      res.status(201).json({ success: true, message: 'Order placed successfully', data: order });

    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to place order', error: error.message });
    }
  }

  
  async getAllOrders(req, res) {
    try {
      const orders = await Order.find({userId:req.user.id}).sort({ createdAt: -1 }); // latest first
    if (!orders || orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No orders placed yet.',
        data: orders,
      });
    }
      res.status(200).json({
        success: true,
        totalOrders:orders.length,
        message: 'All orders fetched successfully',
        data: orders
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error.message
      });
    }
  }

async createRazorpayOrder(req, res) {
  try {
    const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount), // in paise
      currency: "INR",
      receipt: `rcptid_${Date.now()}`,
    });

    return res.status(201).json({
      success: true,
      message: "Razorpay order created successfully",
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });

  } catch (error) {
    console.log("Razorpay order creation error:", error);
    return res.status(500).json({ success: false, message: "Failed to create Razorpay order" });
  }
}

async verifyPaymentAndPlaceOrder(req, res) {
  try {
    const userId = req.user.id;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Step 1: Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // Step 2: Get user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Step 3: Prepare order data
    const orderItems = cart.items.map(item => ({
      menuItemId: item.menuItemId,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);

    const order = new Order({
      userId,
      restaurantId: cart.restaurantId,
      items: orderItems,
      totalAmount,
      razorpay_order_id,
      razorpay_payment_id,
      paymentStatus: 'Paid'
    });

    await order.save();

    // Step 4: Clear the cart
    cart.items = [];
    await cart.save();

    // Step 5: Send confirmation email
    const user = await User.findById(userId);
    if (user) {
      await sendOrderConfirmationEmail(user, order);
    }

    res.status(201).json({
      success: true,
      message: "Payment verified and order placed successfully",
      data: order
    });

  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ success: false, message: "Payment verification failed", error: error.message });
  }
}

//----------------------------------------ADMIN PANEL API----------------------------------

// OrderController.js
async table(req, res) {
  try {
    const userData = await User.findById(req.user.id);

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $lookup: {
          from: 'restaurants',
          localField: 'restaurantId',
          foreignField: '_id',
          as: 'restaurant'
        }
      },
      {
        $unwind: '$restaurant'
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    res.render('ordermanagemnetTable', {
      title: 'Orders Table',
      data: userData,
      orders,
       success: req.flash('success_msg'),
        error: req.flash('error'),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}


// Update status
async updateStatus(req, res) {
  try {
    const { orderId, status } = req.body;
    const allowedStatus = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];

    if (!allowedStatus.includes(status)) {
      req.flash('error', 'Invalid status value');
      return res.redirect('/api/orders/table');
    }

    const updated = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!updated) {
      req.flash('error', 'Order not found');
      return res.redirect('/api/orders/table');
    }

    req.flash('success_msg', 'Order status updated successfully');
    res.redirect('/api/orders/table');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to update order status');
    res.redirect('/api/orders/table');
  }
}



}

module.exports = new OrderController();
