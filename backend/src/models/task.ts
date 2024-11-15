// const mongoose = require("mongoose")

import mongoose from "mongoose";

interface ITask extends Document {
  _id: string;
  name: string;
  tag: string;
  billable: boolean;
  startAt: string;
  endAt: string;
  projectName: string;
  totalTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema({
  name: { type: String, required: false },
  tag: { type: String, required: false },
  billable: { type: Boolean, required: false },
  startAt: { type: String, required: false },
  endAt: { type: String, required: false },
  projectName: { type: String, requied: false },
  totalTime: { type: String, required: false },
}, {
    timestamps:true
});

const TaskModel = mongoose.model("task", taskSchema);

// module.exports = TaskModel

export default TaskModel;
