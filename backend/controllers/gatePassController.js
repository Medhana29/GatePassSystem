const GatePass = require("../models/GatePass");

const applyGatePass = async (req, res) => {
  try {
    const {
      reason,
      destination,
      exitDate,
      expectedReturnDate,
    } = req.body;

    const gatePass = await GatePass.create({
      student: req.user.id,
      reason,
      destination,
      exitDate,
      expectedReturnDate,
    });

    res.status(201).json({
      message: "Gate pass application submitted successfully",
      gatePass,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to apply for gate pass",
      error: error.message,
    });
  }
};
// Get gate passes of logged-in student
const getMyGatePasses = async (req, res) => {
  try {
    const gatePasses = await GatePass.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      gatePasses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your gate passes",
      error: error.message,
    });
  }
};

module.exports = {
  applyGatePass,
  getMyGatePasses,
};