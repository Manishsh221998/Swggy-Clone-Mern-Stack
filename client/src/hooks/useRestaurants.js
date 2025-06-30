// hooks/useRestaurants.js
import { useQuery } from '@tanstack/react-query';
import {
  getMenuCategory,
  getAllRestaurants,
  getRestaurantWithMenu,
  getRestaurantsByCategory
} from '../api/apiHandler';

// Get all menu categories
export const useMenuCategories = () => {
  return useQuery({
    queryKey: ['menu/categories'],
    queryFn: getMenuCategory
  });
};

// Get all restaurants
export const useAllRestaurants = () => {
  return useQuery({
    queryKey: ['restaurants/all'],
    queryFn: getAllRestaurants
  });
};

// Get restaurant with its menu
export const useRestaurantWithMenu = (id) => {
  return useQuery({
    queryKey: ['restaurant-with-menu', id],
    queryFn: () => getRestaurantWithMenu(id),
    enabled: !!id
  });
};

// Get restaurants by menu category
export const useRestaurantsByCategory = (categoryId) => {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getRestaurantsByCategory(categoryId),
    enabled: !!categoryId
  });
};
