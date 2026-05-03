const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    medicalHistory: [
      {
        disease: String,
        diagnosedAt: Date,
        severity: {
          type: String,
          enum: ["low", "medium", "high"],
        },
      },
    ],
    lifeStyle: {
      smoker: {
        type: Boolean,
        default: false,
      },
      alchohol: {
        type: Boolean,
        default: false,
      },
      exerciseFrequency: {
        type: String,
        enum: ["none", "low", "moderate", "high"],
      },
    },
    insurance: {
      provider: String,
      policyNumber: String,
      type: {
        type: String,
        enum: ["basic", "premium", "family", "corporate"],
      },
      coverageAmount: Number,
      startDate: Date,
      endDate: Date,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
