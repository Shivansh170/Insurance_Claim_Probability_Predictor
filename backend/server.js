const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
dotenv.config();
//middlewares
app.use(express.json());

//routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error in starting the server", error.message);
  }
};
startServer();
