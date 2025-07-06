import React from 'react'
import TopRestaurantChains from './TopRestaurents/TopRestaurantChains'
import FoodCategories from './MenuCategory/FoodCategories'
import { Box } from '@mui/material'
 import AllRestaunrents from './TopRestaurents/AllRestaunrents'
import SwiggyLandingPage from './SwiggyLandingPage'
import TopMenuItemsList from './TopMenuItems/TopMenuItemsList'
 
const Home = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1320px', // Custom swiggy-like width
        mx: 'auto',  // Center horizontally
        // mt:10,       
        px: { xs: 2, sm: 3, md: 4 }, // Responsive padding
      }}
    >
       <FoodCategories />
      {/* <SwiggyLandingPage/> */}
      <TopRestaurantChains />
      <TopMenuItemsList/>
       <AllRestaunrents/>
    </Box>
  )
}

export default Home
