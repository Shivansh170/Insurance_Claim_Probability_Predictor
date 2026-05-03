const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
dotenv.config();
//middlewares
app.use(express.json());
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
