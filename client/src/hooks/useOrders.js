import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  getCart,
  addToCart,
  decreaseCartItem,
  removeFromCart,
  clearCart,
  placeOrder,
  createOrder,
  verifyPayment
} from '../api/apiHandler';

// ----------------------
// Get cart
export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to fetch cart.";
      toast.error(message);
    }
  });
};

// ----------------------
// Add or update item in cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success("Item added to cart!");
      queryClient.invalidateQueries(['cart']);
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to add item to cart.";
      toast.error(message);
    }
  });
};

// ----------------------
// Decrease item quantity
export const useDecreaseCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: decreaseCartItem,
    onSuccess: () => {
      toast.success("Item quantity decreased.");
      queryClient.invalidateQueries(['decrease']);
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to decrease item quantity.";
      toast.error(message);
    }
  });
};

// ----------------------
// Remove item from cart
export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      toast.success("Item removed from cart.");
      queryClient.invalidateQueries(['cart']);
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to remove item from cart.";
      toast.error(message);
    }
  });
};

// ----------------------
// Clear cart
export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success("Cart cleared successfully.");
      queryClient.invalidateQueries(['cart']);
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to clear cart.";
      toast.error(message);
    }
  });
};

// ----------------------
// NEW: Place Order
export const usePlaceOrder = () => {
  return useMutation({
    mutationFn: () => placeOrder(),
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Order placed successfully!");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Order failed!";
      toast.error(message);
    },
  });
};

export const useCreateRazorpayOrder = () => {
  return useMutation({
    mutationFn: createOrder,
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to create Razorpay order.";
      toast.error(message);
    }
  });
};

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: verifyPayment,
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Payment verified and order placed!");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Payment verification failed!";
      toast.error(message);
    },
  });
};