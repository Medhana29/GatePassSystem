const express = require("express");

const {
  applyGatePass,
  getMyGatePasses,
} = require("../controllers/gatePassController");

const {
  protect,
  studentOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/apply",
  protect,
  studentOnly,
  applyGatePass
);

router.get(
  "/my",
  protect,
  studentOnly,
  getMyGatePasses
);

module.exports = router;