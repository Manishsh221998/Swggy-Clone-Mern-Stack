const express = require('express');
const router = express.Router();
const EmployeeController = require('../controller/Employee.Controller');
const imageUpload = require('../helper/imageUpload');
const AuthCheck = require('../middleware/AuthCheck'); // make sure user is logged in
const authorizeRole = require('../middleware/AuthorizeRole'); // allow Admin/Super Admin

 
router.get('/add-employee',AuthCheck,EmployeeController.addForm);
router.post('/add', AuthCheck,imageUpload.single('image'),authorizeRole('Admin'),EmployeeController.add);
 router.get('/regenerate-password/:id', AuthCheck, authorizeRole('Admin'), EmployeeController.updatePassword);
router.get('/delete/:id', AuthCheck, authorizeRole('Admin'), EmployeeController.delete);

module.exports = router;
