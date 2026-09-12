const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const gatePassRoutes = require("./routes/gatePassRoutes");
const adminRoutes = require("./routes/adminRoutes");
const securityRoutes = require("./routes/securityRoutes");
const cors = require("cors");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/gatepass", gatePassRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/security", securityRoutes);
// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Gate Pass Management System API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});