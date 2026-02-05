require("dotenv").config(); 

const express = require("express");
const cors = require("cors");

require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

const PORT = process.env.PORT || 3001;

// --------------------
// CORS Configuration
// --------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "http://localhost:3001",
      process.env.CLIENT_URL, // Render frontend
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// --------------------
// Routes
// --------------------
app.use("/api/projects/:projectId/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("Task App API is alive and well");
});

// --------------------
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
