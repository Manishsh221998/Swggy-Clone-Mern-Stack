
export const BASE_URL='https://swggy-clone-mern-stack.onrender.com/api'
export const BaseUrlImage='https://swggy-clone-mern-stack.onrender.com'
const ENDPOINTS = {
  //User Auth 
  CREATE_USER: '/auth/create/user',
  VERIFY_OTP: '/auth/verify/otp',
  USER_LOGIN: '/auth/user/login',
  RESET_PASSWORD_LINK: '/auth/user/reset-password-link',
  RESET_PASSWORD: (id, token) => `/auth/user/reset-password/${id}/${token}`,
  USER_PROFILE: '/auth/user/profile',
  UPDATE_PASSWORD: '/auth/user/update-password',
  UPDATE_PROFILE: '/auth/user/profile-update',
  MANAGE_ADDRESS: '/auth/user/address',

// Restaurant & Menu  
  MENU_CATEGORY: '/menuCategory-list',  
  RESTAURANTS_LIST: '/restaurant-list',
  MENUITEMS_LIST: '/menuItems-list',
  RESTAURANT_WITH_MENU: (id) => `/restaurant-with-menu/${id}`,
  RESTAURANTS_BY_CATEGORY: (categoryId) => `/category/${categoryId}`,

  // Orders
  PLACE_ORDER: '/order/place-order',
  MY_ORDERS: '/orders',
  RAZORPAY_CREATE_ORDER:'/razorpay/create-order',
  RAZORPAY_VERIFY_AND_PLACE_ORDER:'/razorpay/verify',

  // Cart
GET_CART: '/cart',
ADD_TO_CART: '/add/cart',
DECREASE_CART_ITEM:`/cart/decrease`,
REMOVE_CART_ITEM: '/cart/remove-item',
CLEAR_CART: '/cart/clear',

};

export default ENDPOINTS;
