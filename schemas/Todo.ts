import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Completed", "Pending"],
    default: "Pending",
  },
  date:{
    type:Date
  }
});

export const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
