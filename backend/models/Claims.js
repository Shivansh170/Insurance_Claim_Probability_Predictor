const mongoose = require("mongoose");
const claimSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    policy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InsurancePolicy",
      required: true,
    },
    disease: {
      type: String,
      required: true,
      lowercase: true,
    },

    hospital: {
      name: String,
      location: String,
    },
    admissionDate: {
      type: Date,
      required: true,
    },
    dischargeDate: {
      type: Date,
      required: true,
    },
    claimedAmount: {
      type: Number,
      required: true,
    },

    approvedAmount: {
      type: Number,
      default: 0,
    },
    analysis: {
      probabilityOfApproval: {
        type: Number, // 0 to 1
        min: 0,
        max: 1,
      },

      riskFactors: [
        {
          type: String,
        },
      ],

      reason: String, // explanation (AI / rules)
    },
    status: {
      type: String,
      enum: ["pending", "under_review", "approved", "rejected"],
      default: "pending",
    },
    decisionNote: {
      type: String,
    },
    documents: [
      {
        type: String, // file URLs
      },
    ],
  },
  { timestamps: true },
);

const Claims = mongoose.model("Claims", claimSchema);
module.exports = Claims;
