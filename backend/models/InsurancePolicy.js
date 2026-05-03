const mongoose = require("mongoose");

const insurancePolicySchema = new mongoose.Schema(
  {
    // 🔗 Reference to User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🏢 Provider Info
    provider: {
      type: String,
      required: true,
      trim: true,
    },

    policyNumber: {
      type: String,
      required: true,
      unique: true,
    },

    // 📦 Policy Details
    type: {
      type: String,
      enum: ["basic", "premium", "family", "corporate"],
      required: true,
    },

    coverageAmount: {
      type: Number,
      required: true,
    },

    premiumAmount: {
      type: Number,
      required: true,
    },

    // 📅 Duration
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    // 📋 Coverage Rules (IMPORTANT for claim analyzer)
    coveredDiseases: [
      {
        type: String,
        lowercase: true,
      },
    ],

    exclusions: [
      {
        type: String,
      },
    ],

    waitingPeriod: {
      type: Number, // in months
      default: 0,
    },

    // 📊 Status Tracking
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
  },
  { timestamps: true },
);

const InsurancePolicy = mongoose.model(
  "InsurancePolicy",
  insurancePolicySchema,
);

module.exports = InsurancePolicy;
