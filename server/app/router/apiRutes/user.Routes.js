const express=require('express')
const UserController = require('../../controller/apiControllers/User.Controller')
const imageUpload = require('../../helper/imageUpload')
const AuthCheckUser = require('../../middleware/AuthCheckUser')
const router=express.Router()


router.post('/create/user',imageUpload.single('image'),UserController.createUser)
router.post('/verify/otp',UserController.verifyOtp)
router.post('/user/login',UserController.userLogin)

router.post('/user/reset-password-link',UserController.resetPasswordLink)
router.post('/user/reset-password/:id/:token',UserController.resetPassword)

router.use(AuthCheckUser)
router.get('/user/profile',UserController.userProfile)
router.post('/user/update-password',UserController.updatePassword)
router.put('/user/profile-update',imageUpload.single('image'), UserController.updateUserProfile);
router.put('/user/address', UserController.manageUserAddress);

module.exports=router