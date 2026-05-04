const jwt = require("jsonwebtoken");
const authMiddleWare = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      message: "No token provided",
    });
  }
  const token = authHeaders.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired Token",
    });
  }
};

module.exports = authMiddleWare;
