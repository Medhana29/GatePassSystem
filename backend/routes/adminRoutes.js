const express = require("express");

const {
  getAllGatePasses,
  approveGatePass,
  rejectGatePass,
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/gatepasses", protect, adminOnly, getAllGatePasses);

router.put("/gatepass/:id/approve", protect, adminOnly, approveGatePass);

router.put("/gatepass/:id/reject", protect, adminOnly, rejectGatePass);

module.exports = router;