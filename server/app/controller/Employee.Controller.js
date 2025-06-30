const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const Role = require('../models/Role');
const generateAutoPassword = require('../helper/generateAutoPassword');
const { hashPassword } = require('../middleware/hashPassword');
const sendEmailCredentials = require('../helper/sendEmailCredentials');

class EmployeeController {

  // Show Add Employee Form
  async addForm(req, res) {
    try {
      const roles = await Role.find();
      const employees = await User.find({ role: ['Employee',"Executive"] }).lean();
      const success_msg = req.flash('success_emp');
      const error_msg = req.flash('error');

      res.render('employeInventory', {
        roles,
        data: req.user,
        employees,
        success_msg,
        error_msg
      });
    } catch (err) {
      console.error('Error loading add employee form:', err);
      req.flash('error', 'Error loading the form.');
      res.redirect('/');
    }
  }

  // Handle Add Employee
  async add(req, res) {
    try {
      const { name, email, roleId } = req.body;

      if (!name || !email || !roleId) {
        req.flash('error', 'All fields are required.');
        return res.redirect('/add-employee');
      }

      const role = await Role.findById(roleId);
      if (!role) {
        req.flash('error', 'Invalid role selected.');
        return res.redirect('/add-employee');
      }

      const profileImage = req.file ? req.file.path : '';

      const plainPassword = generateAutoPassword();
      const hashedPassword = await hashPassword(plainPassword);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        roleId,
        role: role.name,
        image: profileImage
      });

      const savedUser = await newUser.save();

      await sendEmailCredentials(savedUser, plainPassword);

      req.flash('success_emp', 'Employee added successfully. Login credentials have been emailed.');
      res.redirect('/add-employee');

    } catch (err) {
      console.error('Error adding employee:', err);
      req.flash('error', 'Something went wrong while adding the employee.');
      res.redirect('/add-employee');
    }
  }

  // Handle Regenerate Password
  async updatePassword(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        req.flash('error', 'Employee not found.');
        return res.redirect('/add-employee');
      }

      const newPassword = generateAutoPassword();
      const hashedPassword = await hashPassword(newPassword);

      user.password = hashedPassword;
      await user.save();

      await sendEmailCredentials(user, newPassword);

      req.flash('success_emp', 'New password generated and sent via email.');
      res.redirect('/add-employee');

    } catch (err) {
      console.error('Error updating employee password:', err);
      req.flash('error', 'Something went wrong while updating the employee.');
      res.redirect('/add-employee');
    }
  }

  // Delete Employee
 // Delete Employee
async delete(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      req.flash('error', 'Employee not found.');
      return res.redirect('/add-employee');
    }

    // Delete the profile image from disk if it exists
    if (user.image) {
      fs.unlink(user.image, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
        } else {
          console.log('Profile image deleted:', user.image);
        }
      });
    }

    // Delete the user from DB
    await User.findByIdAndDelete(req.params.id);

    req.flash('success_emp', 'Employee deleted successfully.');
    res.redirect('/add-employee');

  } catch (err) {
    console.error('Error deleting employee:', err);
    req.flash('error', 'Something went wrong while deleting the employee.');
    res.redirect('/add-employee');
  }
}

}

module.exports = new EmployeeController();
