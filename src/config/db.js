const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

// Success
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

// Disconnection
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err.message);
});

module.exports = mongoose.connection;
