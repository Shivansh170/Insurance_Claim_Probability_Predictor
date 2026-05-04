const User = require("../models/Users");
const fetchDetails = async (req, res) => {
  try {
    const userId = req.user.user;
    const { name, email, age, gender, insurance } = await User.findById(userId);
    return res.status(200).json({
      success: true,
      details: {
        name: name,
        email: email,
        age: age,
        gender: gender,
        insurance: insurance,
      },
    });
  } catch (error) {
    console.log("Error in fetching the details from the server...");
    return res.status(500).json({
      success: false,
      message: `${error.message}`,
    });
  }
};
const updateDetails = async (req, res) => {
  try {
    const userId = req.user.user;
    const { name, age, gender, medicalHistory } = req.body;
    const updateData = {};
    let pushOperation = null;
    if (name && typeof name === "string") {
      updateData.name = name;
    }
    if (age && typeof age === "number" && age > 0 && age < 140) {
      updateData.age = age;
    }
    if (gender && typeof gender === "string") {
      updateData.gender = gender;
    }
    if (medicalHistory) {
      if (Array.isArray(medicalHistory)) {
        for (let entry of medicalHistory) {
          if (
            !entry.disease ||
            typeof entry.disease !== "string" ||
            !entry.diagnosedAt ||
            isNaN(new Date(entry.diagnosedAt)) ||
            !entry.status ||
            !["ongoing", "recovered"].includes(entry.status)
          ) {
            return res.status(400).json({
              success: false,
              message: "Invalid medical history format (array)",
            });
          }
        }
        updateData.medicalHistory = medicalHistory;
      } else if (typeof medicalHistory === "object") {
        const { disease, diagnosedAt, status } = medicalHistory;
        if (
          !disease ||
          typeof disease !== "string" ||
          !diagnosedAt ||
          isNaN(new Date(diagnosedAt)) ||
          !status ||
          !["ongoing", "recovered"].includes(status)
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid medical history entry",
          });
        }
        pushOperation = {
          medicalHistory: {
            disease,
            diagnosedAt,
            status,
          },
        };
      }
    }
    let updatedUser;
    if (pushOperation) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: pushOperation },
        { new: true },
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });
    }
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedFields: {
        name: updatedUser.name,
        age: updatedUser.age,
        gender: updatedUser.gender,
        medicalHistory: updatedUser.medicalHistory,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Could not update the user: ${error.message}`,
    });
  }
};
module.exports = { fetchDetails, updateDetails };
