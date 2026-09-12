const GatePass = require("../models/GatePass");

const verifyGatePass = async (req, res) => {
  try {
    const { gatePassId, studentId } = req.body;

    if (!gatePassId || !studentId) {
      return res.status(400).json({
        message: "Gate pass ID and student ID are required",
      });
    }

    const gatePass = await GatePass.findOne({
      _id: gatePassId,
      student: studentId,
    }).populate("student", "name email");

    if (!gatePass) {
      return res.status(404).json({
        message: "Invalid gate pass QR code",
      });
    }

    // If the student has already exited,
    // this scan records their return.
    if (gatePass.exitTime && !gatePass.actualReturnTime) {
      gatePass.actualReturnTime = new Date();
      gatePass.status = "completed";

      await gatePass.save();

      return res.json({
        message: "Student return recorded successfully",
        gatePass,
      });
    }

    // First scan records the exit.
    if (!gatePass.exitTime) {
      if (gatePass.status !== "approved") {
        return res.status(400).json({
          message: `Gate pass is ${gatePass.status}`,
        });
      }

      gatePass.exitTime = new Date();

      await gatePass.save();

      return res.json({
        message: "Gate pass verified successfully. Exit recorded.",
        gatePass,
      });
    }

    res.status(400).json({
      message: "Gate pass has already been completed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to verify gate pass",
      error: error.message,
    });
  }
};

module.exports = {
  verifyGatePass,
};