import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ["Completed", "Pending"],
    default: "Pending",
  },
});

export const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
