const GatePass = require("../models/GatePass");
const generateQRCode = require("../utils/qrGenerator");

// Get all gate pass applications
const getAllGatePasses = async (req, res) => {
  try {
    const gatePasses = await GatePass.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.json({
      gatePasses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch gate passes",
      error: error.message,
    });
  }
};

// Approve a gate pass
const approveGatePass = async (req, res) => {
  try {
    const gatePass = await GatePass.findById(req.params.id);

    if (!gatePass) {
      return res.status(404).json({
        message: "Gate pass not found",
      });
    }

   gatePass.status = "approved";

const qrData = JSON.stringify({
  gatePassId: gatePass._id.toString(),
  studentId: gatePass.student.toString(),
});

gatePass.qrCode = await generateQRCode(qrData);

await gatePass.save();

    res.json({
      message: "Gate pass approved successfully",
      gatePass,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve gate pass",
      error: error.message,
    });
  }
};

// Reject a gate pass
const rejectGatePass = async (req, res) => {
  try {
    const gatePass = await GatePass.findById(req.params.id);

    if (!gatePass) {
      return res.status(404).json({
        message: "Gate pass not found",
      });
    }

    gatePass.status = "rejected";
    await gatePass.save();

    res.json({
      message: "Gate pass rejected successfully",
      gatePass,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reject gate pass",
      error: error.message,
    });
  }
};

module.exports = {
  getAllGatePasses,
  approveGatePass,
  rejectGatePass,
};