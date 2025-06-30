// src/api/apiHandler.js
import axiosInstance from './axiosInstance';
import ENDPOINTS from './endpoints';


//------------------------ User Auth  -----------------------------------------

// 1. Create User with Image Upload (multipart/form-data)
export const createUser = async (formData) => {
  return await axiosInstance.post(ENDPOINTS.CREATE_USER, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 2. Verify OTP
export const verifyOtp = async (data) => {
  return await axiosInstance.post(ENDPOINTS.VERIFY_OTP, data);
};

// 3. User Login
export const userLogin = async (data) => {
  return await axiosInstance.post(ENDPOINTS.USER_LOGIN, data);
};

// 4. Request Password Reset Link
export const resetPasswordLink = async (data) => {
  return await axiosInstance.post(ENDPOINTS.RESET_PASSWORD_LINK, data);
};

// 5. Reset Password
export const resetPassword = async (id, token, data) => {
  return await axiosInstance.post(ENDPOINTS.RESET_PASSWORD(id, token), data);
};

// 6. Get User Profile (Requires Auth)
export const getUserProfile = async () => {
  return await axiosInstance.get(ENDPOINTS.USER_PROFILE);
};

// 7. Update Password
export const updatePassword = async (data) => {
  return await axiosInstance.post(ENDPOINTS.UPDATE_PASSWORD, data);
};

// 8. Update Name & Image
export const updateUserProfile = async (formData) => {
  return await axiosInstance.put(ENDPOINTS.UPDATE_PROFILE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 9. Manage Address (Add, Update, Delete)
export const manageUserAddress = async (data) => {
  return await axiosInstance.put(ENDPOINTS.MANAGE_ADDRESS, data);
};

//--------------------------------------------------------------------------------


//------------------------- Restaurant & Menu  -----------------------------------

// Get all menu categories
export const getMenuCategory = async () => {
  return await axiosInstance.get(ENDPOINTS.MENU_CATEGORY);
};

// Get all restaurants
export const getAllRestaurants = async () => {
  return await axiosInstance.get(ENDPOINTS.RESTAURANTS_LIST);
};

// Get a specific restaurant with its menu
export const getRestaurantWithMenu = async (id) => {
  return await axiosInstance.get(ENDPOINTS.RESTAURANT_WITH_MENU(id));
};

// Get restaurants by menu category
export const getRestaurantsByCategory = async (categoryId) => {
  return await axiosInstance.get(ENDPOINTS.RESTAURANTS_BY_CATEGORY(categoryId));
};

//--------------------------------------------------------------------------------


//------------------------ Cart Operations ---------------------------------------

// Get the user's current cart
export const getCart = async () => {
  return await axiosInstance.get(ENDPOINTS.GET_CART);
};

// Add or update item in cart
export const addToCart = async (data) => {
  return await axiosInstance.post(ENDPOINTS.ADD_TO_CART, data);
};

// Decrease quantity of a specific item
export const decreaseCartItem = async ({ menuItemId }) => {
  return await axiosInstance.post(ENDPOINTS.DECREASE_CART_ITEM, { menuItemId });
};

// Remove an item from the cart
export const removeFromCart = async (data) => {
  return await axiosInstance.post(ENDPOINTS.REMOVE_CART_ITEM, data);
};

// Clear the cart
export const clearCart = async () => {
  return await axiosInstance.delete(ENDPOINTS.CLEAR_CART);
};

//--------------------------------------------------------------------------------


//------------------------- Place Order ------------------------------------------

// User Place Order  (Requires Auth)
export const placeOrder = async () => {
  return await axiosInstance.get(ENDPOINTS.PLACE_ORDER);
};

// Get User Orders History (Requires Auth)
export const getUserOrders = async () => {
  return await axiosInstance.get(ENDPOINTS.MY_ORDERS);
};
//--------------------------------------------------------------------------------