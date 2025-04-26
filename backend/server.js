require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db"); // Ensure you have the correct DB config
const app = express();

const event = require('./routes/eventRoutes');
const user = require('./routes/userRoutes');
const auth = require("./routes/authRoutes");

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/event", event);
app.use("/api/user", user);
app.use("/api/auth", auth); // Use auth routes for registration and login

// Port config
const PORT = 5000;

// Server
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});

module.exports = app; // Export app for testing if needed
