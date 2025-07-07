const express = require('express');
const UserController = require('../../controller/apiControllers/User.Controller');
const imageUpload = require('../../helper/imageUpload');
const AuthCheckUser = require('../../middleware/AuthCheckUser');
const router = express.Router();

/**
 * @swagger
 * /api/auth/create/user:
 *   post:
 *     summary: Create a new user with image upload
 *     tags:
 *       - User
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         required: false
 *         description: Optional profile image
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *       - in: formData
 *         name: mobile
 *         type: number
 *         required: false
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.post('/create/user', imageUpload.single('image'), UserController.createUser);

/**
 * @swagger
 * /api/auth/verify/otp:
 *   post:
 *     summary: Verify user OTP
 *     tags:
 *       - User
 *     parameters:
 *       - in: body
 *         name: verification
 *         description: Email and OTP for verification
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - otp
 *           properties:
 *             otp:
 *               type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 */

router.post('/verify/otp', UserController.verifyOtp);

/**
 * @swagger
 * /api/auth/user/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - User
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Login credentials
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */

router.post('/user/login', UserController.userLogin);

/**
 * @swagger
 * /api/auth/user/reset-password-link:
 *   post:
 *     summary: Send reset password link to user's email
 *     tags:
 *       - User
 *     parameters:
 *       - in: body
 *         name: email
 *         description: Email address to send reset link to
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *               example: user@example.com
 *     responses:
 *       200:
 *         description: Reset link sent successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/user/reset-password-link', UserController.resetPasswordLink);

/**
 * @swagger
 * /api/auth/user/reset-password/{id}/{token}:
 *   post:
 *     summary: Reset user password
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: token
 *         in: path
 *         required: true
 *         type: string
 *       - in: body
 *         name: passwordReset
 *         description: New password and confirmation
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - password
 *             - confirmPassword
 *           properties:
 *             password:
 *               type: string
 *               example: MyNewPassword123
 *             confirmPassword:
 *               type: string
 *               example: MyNewPassword123
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 *       422:
 *         description: Passwords do not match
 */
router.post('/user/reset-password/:id/:token', UserController.resetPassword);

router.use(AuthCheckUser);

/**
 * @swagger
 * /api/auth/user/profile:
 *   get:
 *     summary: Get user profile (Protected)
 *     tags:
 *       - User
 *     description: >
 *       Requires a Bearer token in the header:  
 *       `Authorization: Bearer <token>`
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         type: string
 *         description: Bearer token for authentication (e.g. 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
router.get('/user/profile', UserController.userProfile);

/**
 * @swagger
 * /api/auth/user/update-password:
 *   post:
 *     summary: Update user password (Protected)
 *     tags:
 *       - User
 *     description: >
 *       Requires a Bearer token in the header:  
 *       `Authorization: Bearer <token>`
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         type: string
 *         description: Bearer token (e.g. 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
 *       - in: body
 *         name: passwordUpdate
 *         description: Current and new password
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - password
 *           properties:
 *             password:
 *               type: string
 *               example: OldPass123
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid current password
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
router.post('/user/update-password', UserController.updatePassword);

router.put('/user/profile-update', imageUpload.single('image'), UserController.updateUserProfile);

router.put('/user/address', UserController.manageUserAddress);

module.exports = router;
