const User = require("../models/Users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });
    if (user) {
      res.status(409).json({
        success: false,
        message: "user with this email already exists",
      });
    } else {
      const hashedPassword = await bcryptjs.hash(data.password, 16);
      data.password = hashedPassword;
      const newUser = new User(data);
      await newUser.save();
      res.status(200).json({
        success: true,
        message: `${data.name} added to the Users collection successfully`,
      });
    }
  } catch (error) {
    console.log("Error in registering the user...", error.message);
  }
};
const loginUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "No user with this email found in the database",
      });
    } else {
      const decodedPassword = await bcryptjs.compare(
        data.password,
        user.password,
      );
      if (!decodedPassword) {
        res.status(401).json({
          success: false,
          message: "Incorrect password",
        });
      } else {
        const token = jwt.sign(
          { user: user._id, role: user.role },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "15min" },
        );
        res.status(201).json({
          success: true,
          token: token,
        });
      }
    }
  } catch (error) {
    console.log("Error in logging the user into the portal", error.message);
  }
};
module.exports = { registerUser, loginUser };
