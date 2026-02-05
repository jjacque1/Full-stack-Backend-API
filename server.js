require("dotenv").config();
require("./src/config/db");

const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",      
  process.env.CLIENT_URL,      
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/projects/:projectId/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task App API is alive and well");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
