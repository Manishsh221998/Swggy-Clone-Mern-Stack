const jwt = require("jsonwebtoken");

const AuthCheckUser = async (req, res, next) => {
  try {
    let token =
      req.headers["authorization"] ||
      req.headers["x-access-token"] ||
      req.body.token ||
      req.params.token ||
      req.query.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  }
   catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired token.", error: error.message });
  }
};

module.exports = AuthCheckUser;
