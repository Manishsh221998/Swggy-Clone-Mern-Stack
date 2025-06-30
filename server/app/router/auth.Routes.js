const express=require("express")
const AuthController = require("../controller/Auth.Controller")
const imageUpload = require("../helper/imageUpload")
const AuthCheck = require("../middleware/AuthCheck")
const router=express.Router()

router.post('/create/role',AuthController.createRole)
router.get('/roles',AuthController.getAllRoles)
router.post('/register',imageUpload.single('image'),AuthController.register)
router.get('/register-view',AuthController.registerView)
router.get('/login-view',AuthController.loginView)
router.post('/login',AuthController.login)
router.get('/',AuthCheck,AuthController.dashboard)
router.get('/profile',AuthCheck,AuthController.proflie)
router.post('/update-profile',AuthCheck, imageUpload.single('image'), AuthController.updateProfile);

router.get('/logout',AuthController.logout)
 


module.exports=router