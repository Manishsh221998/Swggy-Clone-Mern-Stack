/**
 * @swagger
 * tags:
 *   - name: Admin Authentication
 *     description: Admin registration, login, role, and profile management
 */

/**
 * @swagger
 * /create/role:
 *   post:
 *     summary: Create a new role
 *     tags: [Admin Authentication]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: role
 *         description: Role object
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *           properties:
 *             name:
 *               type: string
 *               enum: ["Admin", "User", "Employee", "Delivery Partner", "Super Admin"]
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Role creation failed
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Admin Authentication]
 *     responses:
 *       200:
 *         description: List of roles
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /register-view:
 *   get:
 *     summary: Render register page (EJS view)
 *     tags: [Admin Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: HTML view for registration
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new admin (Super Admin only)
 *     tags: [Admin Authentication]
 *     consumes:
 *       - multipart/form-data
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *       - in: formData
 *         name: roleId
 *         type: string
 *       - in: formData
 *         name: image
 *         type: file
 *     responses:
 *       201:
 *         description: User registered successfully
 *       403:
 *         description: Access denied (Not a Super Admin)
 */

/**
 * @swagger
 * /login-view:
 *   get:
 *     summary: Render login page (EJS view)
 *     tags: [Admin Authentication]
 *     responses:
 *       200:
 *         description: HTML view for login
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login as admin
 *     tags: [Admin Authentication]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Admin dashboard (protected route)
 *     tags: [Admin Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get admin profile
 *     tags: [Admin Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile details
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /update-profile:
 *   post:
 *     summary: Update admin profile
 *     tags: [Admin Authentication]
 *     consumes:
 *       - multipart/form-data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *       - in: formData
 *         name: mobile
 *         type: number
 *       - in: formData
 *         name: image
 *         type: file
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Update failed
 */

/**
 * @swagger
 * /delete/{id}:
 *   get:
 *     summary: Delete an admin user (Super Admin only)
 *     tags: [Admin Authentication]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the admin to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout admin
 *     tags: [Admin Authentication]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
