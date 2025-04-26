require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db"); 
const app = express();

const event = require('./routes/eventRoutes');
const user = require('./routes/userRoutes');
const auth = require("./routes/authRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/event", event);
app.use("/api/user", user);
app.use("/api/auth", auth);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});

module.exports = app; 