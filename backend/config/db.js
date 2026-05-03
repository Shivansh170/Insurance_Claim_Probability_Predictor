const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    console.log("Trying to connect to the database...");
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Database connected successfully..");
  } catch (error) {
    console.log("Error in starting the database...", error.message);
  }
};

module.exports = connectDB;
