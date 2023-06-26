require("dotenv").config();
const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/users.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", usersRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An error occurred" });
});

module.exports = app; 
