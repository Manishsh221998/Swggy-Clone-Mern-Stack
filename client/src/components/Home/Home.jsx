import React from 'react'
import TopRestaurantChains from './TopRestaurents/TopRestaurantChains'
import FoodCategories from './MenuCategory/FoodCategories'
import { Box } from '@mui/material'
 import AllRestaunrents from './TopRestaurents/AllRestaunrents'
  
const Home = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1320px', // Custom swiggy-like width
        mx: 'auto',         // Center horizontally
        px: { xs: 2, sm: 3, md: 4 }, // Responsive padding
      }}
    >
       <FoodCategories />
      <TopRestaurantChains />
       <AllRestaunrents/>
    </Box>
  )
}

export default Home
