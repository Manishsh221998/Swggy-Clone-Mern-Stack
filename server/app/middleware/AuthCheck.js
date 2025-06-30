// middleware/AuthCheck.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const AuthCheck = (req, res, next) => {
  const token = req.cookies?.userToken;
if(!token){
    console.log('token not get')
}
  if (!token) {
    return res.redirect('/login-view');
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err || !decoded) {
      console.error("JWT verification failed:", err?.message);
      return res.redirect('/login-view');
    }

    req.user = decoded;
    next();
  });
};

module.exports = AuthCheck;
