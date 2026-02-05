const express = require("express");
const mongoose = require("mongoose");

const authMiddleware = require("../middleware/authMiddleware");
const Project = require("../models/Projects");
const Task = require("../models/Tasks");

const router = express.Router({ mergeParams: true }); //lets this router read :projectId from the parent URL.

// CREATE TASK in a project (Owner only)

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, status } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Please Add Task Title to continue" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to add tasks to this project" });
    }

    const task = await Task.create({
      project: project._id,
      title,
      description,
      status,
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET ALL TASKS for a project (Owner only)

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to view tasks for this project" });
    }

    const tasks = await Task.find({ project: projectId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// UPDATE TASK in a project (Owner only)

router.put("/:taskId", authMiddleware, async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const { title, description, status } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update tasks for this project" });
    }

    const task = await Task.findOne({ _id: taskId, project: projectId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// DELETE TASK in a project (Owner only)

router.delete("/:taskId", authMiddleware, async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete tasks for this project" });
    }

    const task = await Task.findOne({ _id: taskId, project: projectId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
