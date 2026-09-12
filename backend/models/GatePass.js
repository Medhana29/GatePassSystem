const mongoose = require("mongoose");

const gatePassSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    exitDate: {
      type: Date,
      required: true,
    },

    expectedReturnDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },

    qrCode: {
      type: String,
      default: null,
    },

    exitTime: {
      type: Date,
      default: null,
    },

    actualReturnTime: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GatePass", gatePassSchema);