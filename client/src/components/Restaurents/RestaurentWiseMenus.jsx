import React from 'react'
import { useParams } from 'react-router-dom'
import { useRestaurantWithMenu } from '../../hooks/useRestaurants'
import RestaurentMenus from '../Restaurents/menuITems/RestaurentMenus'

const RestaurentWiseMenus = () => {
 const{restaurantId}=useParams()
// console.log(restaurantId)
 const{data}=useRestaurantWithMenu(restaurantId)
//  console.log("kkkkk----:",data)
   return (
    <div> 
       
<RestaurentMenus data={data}/>
       
     </div>
  )
}

export default RestaurentWiseMenus