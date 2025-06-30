import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

import {
  createUser,
  verifyOtp,
  userLogin,
  resetPasswordLink,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateUserProfile,
  manageUserAddress,
   getUserOrders,
} from '../api/apiHandler'; // <-- make sure placeOrder & getUserOrders are in this file

// ----------------------
// Create User
export const useCreateUser = () => {
  return useMutation({
    mutationFn: (formData) => createUser(formData),
    onSuccess: (data) => {
      toast.success(data?.data?.message || "User created successfully!");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to create user.";
      toast.error(message);
    },
  });
};

// ----------------------
// Verify OTP
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (otpData) => verifyOtp(otpData),
    onSuccess: (data) => {
      toast.success(data?.data?.message);
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Invalid OTP. Try again.";
      toast.error(message);
    },
  });
};

// ----------------------
// User Login
export const useUserLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (credentials) => userLogin(credentials),
    onSuccess: (data) => {
      console.log(data)
      window.localStorage.setItem('userToken', data?.data?.token);
      window.localStorage.setItem('userName', data?.data?.data?.name);
      toast.success(data?.data?.message);
      navigate('/');
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    },
  });
};

// ----------------------
// Request Reset Password Link
export const useResetPasswordLink = () => {
  return useMutation({
    mutationFn: (email) => resetPasswordLink(email),
    onSuccess: () => {
      toast.success("Reset link sent to your email!");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to send reset link.";
      toast.error(message);
    },
  });
};

// ----------------------
// Reset Password
export const useResetPassword = () => {
 const navigate= useNavigate()
  return useMutation({
    mutationFn: ({ id, token, newPasswordData }) =>
      resetPassword(id, token, newPasswordData),
    onSuccess: () => {

      toast.success("Password reset successfully!");
 navigate('/')
     },
    onError: (error) => {
      const message = error?.response?.data?.message || "Password reset failed.";
      toast.error(message);
    },
  });
};

// ----------------------
// Get Authenticated User Profile
export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user/profile'],
    queryFn: getUserProfile,
  });
};

// ----------------------
// Update Password
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (passwords) => updatePassword(passwords),
    onSuccess: () => {
      toast.success("Password updated successfully!");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to update password.";
      toast.error(message);
    },
  });
};

// ----------------------
// Update Name & Image
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => updateUserProfile(formData),
    onSuccess: (data, formData) => {
      toast.success(data?.data?.message);

      // Update React Query cache
      queryClient.setQueryData(['user/profile'], (oldData) => {
        if (!oldData?.data?.data) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: {
              ...oldData.data.data,
              ...formData instanceof FormData ? {} : formData,
              ...(data?.data?.data || {}),
            },
          },
        };
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to update profile.";
      toast.error(message);
    },
  });
};

// ----------------------
// Manage Address (add, update, delete)
export const useManageUserAddress = () => {
  return useMutation({
    mutationFn: (addressData) => manageUserAddress(addressData),
    onSuccess: () => {
      toast.success("Address updated successfully!");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to manage address.";
      toast.error(message);
    },
  });
};



// ----------------------
// NEW: Get Order History
export const useUserOrders = () => {
  return useQuery({
    queryKey: ['user/orders'],
    queryFn: getUserOrders,
  });
};
