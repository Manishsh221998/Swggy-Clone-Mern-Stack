const createToken = require("../../helper/createToken");
const sendOtpEmail = require("../../helper/sendOtpEmail");
const sendResetPasswordLinkEmail = require("../../helper/sendResetPasswordLinkEmail");
const sendWelcomeEmail = require("../../helper/sendWelcomeEmail");
const { hashPassword, comparePassword } = require("../../middleware/hashPassword");
const Otp = require("../../models/Otp");
const Role = require("../../models/Role");
const User = require("../../models/User");
const path = require("path");
const jwt = require('jsonwebtoken');
const fs = require('fs');

class UserControler {

  async createUser(req, res) {
    try {
      const { name, email, password ,mobile} = req.body;

      if (!(name && email && password)) {
        return res.status(400).json({
          status: false,
          message: "All input fields are required",
        });
      }

      const role = await Role.findOne({name:'User'});
      console.log(role);
      if (!role) {
        return res.status(400).json({
          status: false,
          message: "role not found",
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: false,
          message: "Email is already registered",
        });
      }

      const hashPasword = await hashPassword(password);
      const user = new User({
        name,
        email,
        mobile,
        password: hashPasword,
        roleId:role._id,
        role: role.name,
      });
      if (req.file) {
        user.image = req.file.path;
      }
      const userData = await user.save();
      await sendOtpEmail(userData)
      return res.status(200).json({
        status: true,
        message: "user created successfully",
        data: userData,
      });
    } catch (error) {
      console.log("Error while creating user :",error);
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
  
 async verifyOtp(req, res){
 try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({
        status: false,
        message: "OTP is required",
      });
    }

    const isValidOtp = await Otp.findOne({ otp });
    if (!isValidOtp) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    const existingUser = await User.findById(isValidOtp.user);
    if (!existingUser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (existingUser.isVerified) {
      return res.status(400).json({
        status: false,
        message: "User is already verified",
      });
    }

    // Check if OTP is expired (valid for 5 minutes)
    const currentTime = new Date();
    const otpCreatedAt = isValidOtp.createdAt;
    const expirationTime = new Date(otpCreatedAt.getTime() + 5 * 60 * 1000);

    if (currentTime > expirationTime) {
      await sendOtpEmail(existingUser); // Send new OTP
      await Otp.deleteOne({ user: existingUser._id }); // Clean old OTPs

      return res.status(400).json({
        status: false,
        message: "OTP expired. A new OTP has been sent to your email.",
      });
    }

    // Mark user as verified
    existingUser.isVerified = true;
    await existingUser.save();

    // Delete OTPs for this user
    await Otp.deleteMany({ user: existingUser._id });

    // Send welcome email
    await sendWelcomeEmail(existingUser);

    return res.status(200).json({
      status: true,
      message: "Otp verified successfully",
    });

  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    return res.status(500).json({
      status: false,
      message: "Server error while verifying OTP",
    });
  }
};

async userLogin(req,res){
  try {
    const{email,password}=req.body
   const user= await User.findOne({email}).select('+password')
   if(!user){
      return res.status(404).json({
          status: false,
          message: "User not exist",
        });
   }
  if (!user.isVerified) {
        return res.status(404).json({
          status: false,
          message: "User is not verified",
        });
      }
      // console.log(user)
    const isMatchPassword=await comparePassword(password, user.password)
  console.log(isMatchPassword)
    if (!isMatchPassword) {
        return res.status(404).json({
          status: false,
          message: "Invalid password",
        });
      }
    const token=await createToken(user)  

 return res.status(200).json({
        status: true,
        message: "Login successfully",
        data: user,
         token
      });
    } catch (error) {
      return res.status(401).json({
        status: false,
        message: error.message,
      });
    }
}

async userProfile(req,res){
  try {
  const user= await User.findById(req.user.id)
    return res.status(200).json({
        status: true,
        message: "Profile fetched successfully",
        data: user
      });
  } catch (error) {
    return res.status(401).json({
        status: false,
        message: error.message,
      });
  }
}

async updatePassword(req,res){
  try {
     const {password}=req.body
  if (!password) {
        return res.status(400).json({
          message: "Password is required",
        });
      }
  const user= await User.findById(req.user.id)
  if(user){
    const newPasswordHashed=await hashPassword(password)
    user.password=newPasswordHashed
    user.save()
  
    return res.status(200).json({
        status: true,
        message: "password updated successfully",
       })}
       else {
        res.status(400).json({
          message: "password not updated",
        });
      }
  } catch (error) {
    return res.status(401).json({
        status: false,
        message: error.message,
      });
  }
}

async resetPasswordLink(req,res){
  try {
     const {email}=req.body
  if (!email) {
        return res.status(400).json({
          status:false,
          message: "email is required",
        });
      }
  const user=await User.findOne({email})
  if(!user){
           return res.status(400).json(
            { status:false, 
              message: "Email doesn't exist"
            });
      }
   await sendResetPasswordLinkEmail(user)
     res.status(200).json({ status:true, message: "Password reset email sent. Please check your email." })

   } catch (error) {
    return res.status(401).json({
        status: false,
        message: error.message,
      });
  }
}

async resetPassword(req,res){
  try {
     const {password,confirmPassword}=req.body
     const{id,token}=req.params

    const user= await User.findById(id)
    if(!user){
 return res.status(400).json({
          status:false,
          message: "User not found",
        });
    }

 if(!password||!confirmPassword){
         return res.status(400).json({ status:false, message: "New Password and Confirm New Password are required" });
 
       }
 
       if (password !== confirmPassword) {
         return res.status(400).json({ status:false, message: "New Password and Confirm Password must be same" });
       }

 // Validate token check 
 const new_secret=user._id+process.env.JWT_SECRET_KEY
const decode= jwt.verify(token,new_secret)
 if(decode){
 const newhashedPassword =await hashPassword(confirmPassword)
 const updatedData=await User.findByIdAndUpdate(decode.userId,{password:newhashedPassword})

 if(updatedData){
         res.status(200).json({ status:true, message: "Password reset successfully" });
 }
 }

   } catch (error) {
    return res.status(401).json({
        status: false,
        message: error.message,
      });
  }
}

async updateUserProfile(req, res) {
  try {
    const { name,email,mobile} = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

     if (name||email||mobile) {
      user.name = name;
      user.email=email
      user.mobile=mobile
    }

     if (req.file) {
      if (user.image && fs.existsSync(user.image)) {
        fs.unlinkSync(user.image); 
      }
      user.image = req.file.path;
    }

    await user.save();

    return res.status(200).json({
      status: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
}

async manageUserAddress(req, res) {
  try {
    const { action, index, address } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    if (!['add', 'update', 'delete'].includes(action)) {
      return res.status(400).json({ status: false, message: 'Invalid action' });
    }

    if (action === 'add') {
      if (user.address.length >= 3) {
        return res.status(400).json({ status: false, message: 'You can only save up to 3 addresses' });
      }
      user.address.push(address);
    }
 
    if (action === 'update') {
      if (index === undefined || !user.address[index]) {
        return res.status(400).json({ status: false, message: 'Invalid address index' });
      }
      user.address[index] = { ...user.address[index]._doc, ...address };
    }

    if (action === 'delete') {
      if (index === undefined || !user.address[index]) {
        return res.status(400).json({ status: false, message: 'Invalid address index' });
      }
      user.address.splice(index, 1);
    }

    await user.save();

    return res.status(200).json({
      status: true,
      message: `Address ${action}d successfully`,
      data: user.address,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
}

}

module.exports = new UserControler();
