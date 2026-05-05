import express from "express";
import Task from "../models/Task.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// ➕ Add task with reminder
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, reminderTime } = req.body;

    const task = await Task.create({
      title,
      description,
      reminderTime,
      userId: req.user.id,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📥 Get tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

// ❌ Delete task
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

export default router;