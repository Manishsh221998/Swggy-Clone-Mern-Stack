const Cart = require('../../models/Cart');
const User = require('../../models/User');
const Menu = require('../../models/MenuItem');
const Restaurant = require('../../models/Restaurant');

class CartController {

  async menuList(req,res){
    try {
     const data=await Menu.aggregate([
      {
        $project:{
          _id:1,
          name:1
        }
      }
     ])

     res.status(200).json({
      totolMenu:data.length,
      message:"menu item list fetched successfully",
      data
     })
    } catch (error) {
      
    }
  }
  // Get cart by userId
async getCart(req, res) {
  try {
    const userId = req.user.id;

    // Optional: Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    const cart = await Cart.findOne({ userId });
 const restaurant= await Restaurant.findById(cart.restaurantId)
//  console.log(restaurant)
const{name,address,image}=restaurant
const restaurantData={name,address,image}
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(404).json({ success: false, message: 'Cart is empty' });
    }

    // Calculate total item count (sum of quantities)
    const totalItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    res.status(200).json({
      success: true,
      totalCount: totalItemCount, // total item quantity
      data: cart,
      restaurantData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message
    });
  }
}


  // Add or update item in cart
async addToCart(req, res) {
  try {
    const userId = req.user.id;
    const { menuItemId, quantity } = req.body;

    // Validate input
    if (!menuItemId || !quantity)
      return res.status(400).json({ success: false, message: 'menuItemId and quantity are required' });

    // Fetch user and menu item in parallel
    const [user, menuItem] = await Promise.all([
      User.findById(userId),
      Menu.findById(menuItemId)
    ]);

    // If either user or menu item not found
    if (!user || !menuItem)
      return res.status(400).json({ success: false, message: 'Invalid user or menu item ID' });

    const itemPrice = menuItem.price;
    const totalPrice = quantity * itemPrice;

    // Try to find existing cart
    let cart = await Cart.findOne({ userId });

    // Prepare the cart item object with all required fields
    const itemData = {
      menuItemId,
      name: menuItem.name,
      quantity,
      price: totalPrice,
      image: menuItem.image,
      isVeg: menuItem.isVeg
    };

    if (!cart) {
      // No cart found, create a new one with the item
      cart = new Cart({
        userId,
        restaurantId: menuItem.restaurantId,
        items: [itemData]
      });
    } else {
      // If restaurant is different, reset the cart
      if (cart.restaurantId && !cart.restaurantId.equals(menuItem.restaurantId)) {
        cart.items = [];
        cart.restaurantId = menuItem.restaurantId;
      }

      // Check if the item already exists in the cart
      const existingItem = cart.items.find(item => item.menuItemId.equals(menuItemId));

      if (existingItem) {
        // If exists, update quantity and price
        existingItem.quantity += quantity;
        existingItem.price = existingItem.quantity * itemPrice;
        existingItem.image = menuItem.image;
        existingItem.isVeg = menuItem.isVeg;
      } else {
        // Else, add the new item to cart
        cart.items.push(itemData);
      }
    }

    // Save the cart to DB
    await cart.save();

    // Respond with updated cart
    return res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      data: cart
    });

  } catch (error) {
    // Handle any server error
    return res.status(500).json({
      success: false,
      message: 'Error updating cart',
      error: error.message
    });
  }
}


async decreaseItemQuantity(req, res) {
  try {
    const userId = req.user.id;
    const { menuItemId } = req.body;

    // Step 1: Validate required input
    if (!menuItemId) {
      return res.status(400).json({ success: false, message: 'menuItemId is required' });
    }

    // Step 2: Check if the menu item exists (for price lookup and validation)
    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    // Step 3: Decrease quantity by 1 using $inc
    // This finds the cart and decrements the quantity of the specific menu item in the items array
    const cart = await Cart.findOneAndUpdate(
      { userId, 'items.menuItemId': menuItemId }, // Match the correct item
      { $inc: { 'items.$.quantity': -1 } },        // Decrement its quantity
      { new: true }                                // Return updated cart
    );

    // If cart or item doesn't exist
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart or item not found' });
    }

    // Step 4: Remove item if its quantity has become 0 or less
    // $pull removes items from the array that match the condition
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { menuItemId, quantity: { $lte: 0 } } } }, // Remove the item if qty <= 0
      { new: true } // Return updated cart after removal
    );

    // Step 5: Recalculate the price for the updated item manually (optional improvement)
    const updatedItem = updatedCart.items.find(item => item.menuItemId.equals(menuItemId));
    if (updatedItem) {
      updatedItem.price = updatedItem.quantity * menuItem.price;
      await updatedCart.save();
    }

    // Step 6: Return final updated cart
    res.status(200).json({
      success: true,
      message: 'Item quantity decreased',
      data: updatedCart
    });

  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({
      success: false,
      message: 'Error updating item quantity',
      error: error.message
    });
  }
}

  // Remove item from cart
  async removeFromCart(req, res) {
    try {
      const userId = req.user.id;
      const { cartItemId } = req.body;

      if (!cartItemId) {
        return res.status(400).json({ success: false, message: 'cartItemId is required' });
      }

      const cart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { items: { _id: cartItemId } } },
        { new: true }
      );

      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }

      res.status(200).json({ success: true, message: 'Item removed from cart', data: cart });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error removing item from cart', error: error.message });
    }
  }

  // Clear cart
  async clearCart(req, res) {
    try {
      const userId = req.user.id;

      const cart = await Cart.findOneAndUpdate(
        { userId },
        { $set: { items: [] } },
        { new: true }
      );

      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }

      res.status(200).json({ success: true, message: 'Cart cleared', data: cart });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error clearing cart', error: error.message });
    }
  }
}

module.exports = new CartController();
