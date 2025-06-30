const { hashPassword, comparePassword } = require("../middleware/hashPassword");
const Role = require("../models/Role");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const MenuItem = require("../models/MenuItem");
const Order = require("../models/Order");
const createToken = require("../helper/createToken");

class AuthCOntroller {
  //create role
  async createRole(req, res) {
    try {
      const { name, description } = req.body;
      const role = new Role({ name, description });
      await role.save();
      res
        .status(201)
        .json({ success: true, message: "Role created successfully", role });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  // Get all roles
  async getAllRoles(req, res) {
    try {
      const roles = await Role.find();
      res
        .status(200)
        .json({
          success: true,
          totalCount: roles.length,
          message: "Roles fetched successfully",
          roles,
        });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async registerView(req, res) {
    const success_msg = req.flash("success_msg");
    const error_msg = req.flash("error_msg");
    try {
      const roles = await Role.find();
      res.render("register", {
        title: "Admin - registeration",
        roles,
        success_msg,
        error_msg,
      });
    } catch (error) {
      console.log("Error in register view");
    }
  }

  async register(req, res) {
    try {
      const { name, email, password, roleId } = req.body;
      if (!(name && email && password && roleId && req.file)) {
        req.flash("error_msg", "All input fields are required");
        return res.redirect("/register-view");
      }
      // Fetch the role
      const role = await Role.findById(roleId);
      if (!role) {
        req.flash("error_msg", "Role not found with the provided ID");
        return res.redirect("/register-view");
      }

      // Check for existing email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        req.flash("error_msg", "Email is already registered");
        return res.redirect("/register-view");
      }

      // Handle image
      let profileImage = "";
      if (req.file) {
        profileImage = req.file.path;
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Create user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        roleId,
        role: role.name,
        image: profileImage,
      });

      await newUser.save();

      req.flash("success_msg", "User registered successfully. Please log in.");
      res.redirect("/login-view");
    } catch (error) {
      console.error("Registration Error:", error);
      req.flash("error_msg", "Server error while registering user");
      res.redirect("/register-view");
    }
  }

  async loginView(req, res) {
    try {
      const error_msg = req.flash("error_msg_log");
      const success_msg = req.flash("success_msg_log");
      res.render("login", {
        title: "Login",
        error_msg,
        success_msg,
      });
    } catch (error) {
      console.log("Error in login view :", error);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        req.flash("error_msg", "All input fields are required");
        return res.redirect("/login-view");
      }

      const user = await User.findOne({ email }).select("+password");
      // console.log(user)
      if (!user) {
        req.flash("error_msg_log", "User does not exist");
        return res.redirect("/login-view");
      }

      if (!user.password) {
        console.log("User found but no password set in DB");
        req.flash("error_msg_log", "Invalid user credentials");
        return res.redirect("/login-view");
      }

      const isPasswordMatched = await comparePassword(password, user.password);

      if (!isPasswordMatched) {
        req.flash("error_msg_log", "Incorrect password");
        return res.redirect("/login-view");
      }

      const token = await createToken(user);

      if (token) {
        res.cookie("userToken", token);
        req.flash("success_msg_log", "Login successful");
        return res.redirect("/");
      } else {
        req.flash("error_msg_log", "Token generation failed");
        return res.redirect("/login-view");
      }
    } catch (error) {
      console.log("Error in login:", error);
      req.flash("error_msg_log", "An unexpected error occurred");
      res.redirect("/login-view");
    }
  }

  async dashboard(req, res) {
    try {
      const userData = await User.findById(req.user.id);

      // Count users by roles
      const adminCount = (await User.find({ role: "Admin" })).length;
      const userCount = (await User.find({ role: "User" })).length;
      const employeeCount = (await User.find({ role: "Employee" })).length;
      const executiveCount = (await User.find({ role: "Executive" })).length;

      // Count restaurants
      const restaurantCount = (await Restaurant.find()).length;

      // Count menu items by type
      const vegMenuCount = (await MenuItem.find({ isVeg: true })).length;
      const nonVegMenuCount = (await MenuItem.find({ isVeg: false })).length;

       // Count of all orders
    const totalOrderCount = (await Order.find()).length;

      res.render("dashboard", {
        title: "Dashboard",
        data: userData,
        adminCount,
        userCount,
        employeeCount,
        executiveCount,
        restaurantCount,
        vegMenuCount,
        nonVegMenuCount,
        totalOrderCount
      });
    } catch (error) {
      console.log("Dashboard error:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async proflie(req, res) {
    try {
      const error_msg = req.flash("error");
      const success_msg = req.flash("success");

      const userData = await User.findById(req.user.id);
      res.render("profile", {
        title: "Profile",
        data: userData,
        error_msg,
        success_msg,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateProfile(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await User.findById(req.user.id);

      if (!user) {
        req.flash("error", "User not found");
        return res.redirect("/profile");
      }

      // Update image if uploaded
      if (req.file) {
        // Delete old image if exists
        if (user.image && fs.existsSync(user.image)) {
          fs.unlinkSync(user.image);
        }
        user.image = req.file.path;
      }

      user.name = name;
      user.email = email;

      if (password) {
        user.password = await hashPassword(password);
      }

      await user.save();

      req.flash("success", "Profile updated successfully");
      res.redirect("/profile");
    } catch (error) {
      console.error("Profile update error:", error);
      req.flash("error", "Error updating profile");
      res.redirect("/profile");
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("userToken");
      res.redirect("/login-view");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new AuthCOntroller();
