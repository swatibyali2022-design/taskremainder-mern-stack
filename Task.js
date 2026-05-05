import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  reminderTime: Date, // 🔔 NEW FIELD
  userId: String,
});

export default mongoose.model("Task", taskSchema);