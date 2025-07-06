import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getCart,
  addToCart as apiAddToCart,
  decreaseCartItem as apiDecreaseCartItem,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
  placeOrder as apiPlaceOrder,
  createOrder as apiCreateOrder,
  verifyPayment as apiVerifyPayment, 
} from "../api/apiHandler";

// THUNKS
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCart();
      return {
        items: res.data?.data?.items || [],
        cartId: res.data?.data?._id,
        userId: res.data?.data?.userId,
        restaurantId: res.data?.data?.restaurantId,
        createdAt: res.data?.data?.createdAt,
        updatedAt: res.data?.data?.updatedAt,
        restaurantData: res.data?.restaurantData || null,
       };
    } catch (error) {
    //   toast.error("Failed to fetch cart.");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiAddToCart(payload);
       
      toast.success("Item added to cart!");
   
      return res.data?.data?.items;
    } catch (error) {
      toast.error("Failed to add item to cart.");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const decreaseCartItem = createAsyncThunk(
  "cart/decreaseCartItem",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiDecreaseCartItem(payload);
      toast.success("Item quantity decreased.");
      return res.data?.data?.items;
    } catch (error) {
      toast.error("Failed to decrease item quantity.");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiRemoveFromCart(payload);
      toast.success("Item removed from cart.");
      return res.data?.data?.items; // Ensure this returns updated cart
    } catch (error) {
      toast.error("Failed to remove item.");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await apiClearCart();
      toast.success("Cart cleared successfully.");
      return [];
    } catch (error) {
      toast.error("Failed to clear cart.");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const placeOrder = createAsyncThunk(
  "cart/placeOrder",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiPlaceOrder();
      toast.success(res?.data?.message || "Order placed successfully!");
      return res.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Order failed!";
      toast.error(message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createRazorpayOrder = createAsyncThunk(
  "cart/createRazorpayOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiCreateOrder(payload); // From your apiHandler
      return res.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to create Razorpay order.";
      toast.error(message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const verifyRazorpayPayment = createAsyncThunk(
  "cart/verifyRazorpayPayment",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiVerifyPayment(payload);
      toast.success(res?.data?.message || "Payment verified and order placed!");
      return res.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Payment verification failed!";
      toast.error(message);
      return rejectWithValue(error.response?.data);
    }
  }
);

// REDUCER
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
    fullItems: [],
    restaurantData: null,
    cartId: null,
    userId: null,
     status: "idle",
    error: null,
    order: null,
    razorpayOrder: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        const updatedItems = {};
        action.payload.items.forEach((item) => {
          if (item.quantity > 0) updatedItems[item.menuItemId] = item.quantity;
        });
        state.items = updatedItems;
        state.fullItems = action.payload.items;
        state.cartId = action.payload.cartId;
        state.userId = action.payload.userId;
        state.restaurantData = action.payload.restaurantData;
        })

      .addCase(addToCart.fulfilled, (state, action) => {
        const updatedItems = {};
        action.payload.forEach((item) => {
          if (item.quantity > 0) updatedItems[item.menuItemId] = item.quantity;
        });
        state.items = updatedItems;
        state.fullItems = action.payload;
      })

      .addCase(decreaseCartItem.fulfilled, (state, action) => {
        const updatedItems = {};
        action.payload.forEach((item) => {
          if (item.quantity > 0) updatedItems[item.menuItemId] = item.quantity;
        });
        state.items = updatedItems;
        state.fullItems = action.payload;
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        const updatedItems = {};
        action.payload.forEach((item) => {
          if (item.quantity > 0) {
            updatedItems[item.menuItemId] = item.quantity;
          }
        });
        state.items = updatedItems;
        state.fullItems = action.payload;
      })

      .addCase(clearCart.fulfilled, (state) => {
        state.items = {};
        state.fullItems = [];
        state.cartId = null;
        state.userId = null;
        state.restaurantData = null;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.items = {};
        state.fullItems = [];
        state.cartId = null;
        state.userId = null;
        state.restaurantData = null;
        state.order = action.payload;
        state.razorpayOrder = null
      })

      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
  state.razorpayOrder = action.payload;
})
  .addCase(verifyRazorpayPayment.fulfilled, (state, action) => {
      state.items = {};
      state.fullItems = [];
      state.cartId = null;
      state.userId = null;
      state.restaurantData = null;
      state.order = action.payload;
      state.razorpayOrder = null;
    });
  },
});

export default cartSlice.reducer;
