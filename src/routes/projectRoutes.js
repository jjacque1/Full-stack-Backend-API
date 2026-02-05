const express = require("express");
const mongoose = require("mongoose");
const Project = require("../models/Projects");
const Task = require("../models/Tasks");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;

    const trimmedName = name?.trim();

    if (!trimmedName) {
      return res
        .status(400)
        .json({ message: "Please enter a project name to continue" });
    }

    const project = await Project.create({
      owner: req.user._id,
      name: trimmedName,
      description: description ?? "",
    });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET ALL PROJECTS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET ONE PROJECT (Owner ONLY)
router.get("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this project" });
    }

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// UPDATE PROJECT (Owner ONLY)
router.put("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this project" });
    }

    const trimmedName = name?.trim();

    if (trimmedName) {
      project.name = trimmedName;
    }

    if (description !== undefined) {
      project.description = description.trim();
    }

    await project.save();

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// DELETE PROJECT (Owner ONLY)
router.delete("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this project" });
    }

    await Task.deleteMany({ project: projectId });
    await Project.deleteOne({ _id: projectId });

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
