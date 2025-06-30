const express=require("express")
const AuthCheck=require('../middleware/AuthCheck')
const dashboardController = require("../controller/dashboardController")
 
 
  
const router=express.Router()
 

//admin-authnetication
  router.get('/forgotPassword',dashboardController.forgotPassword)


 
//table
// router.get('/table',AuthCheck,dashboardController.table)


module.exports=router