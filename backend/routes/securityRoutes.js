const express = require("express");

const { verifyGatePass } = require("../controllers/securityController");

const {
  protect,
  securityOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/verify",
  protect,
  securityOnly,
  verifyGatePass
);

module.exports = router;