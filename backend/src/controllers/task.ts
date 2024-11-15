import express, { Request, Response, Router } from "express";
import TaskModel from "../models/task.js";

// const taskControl: Router = express.Router();

// GET endpoint to fetch tasks by project or all tasks
// taskControl.get("/", async (req: Request, res: Response): Promise<Response | void> => {

// });

const getAllTask = async () => {
  try {
    const tasks = await TaskModel.find();
    return tasks;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// POST endpoint to create a new task
// taskControl.post("/new", async (req: Request, res: Response): Promise<Response | void> => {

// });

const createTask = async (_, { name, startAt, endAt, totalTime, tag = null, billable = false }) => {
  try {
    console.log("fields received:", name, startAt, endAt, totalTime, tag, billable);
    const newTask = await TaskModel.create({ name, startAt, endAt, totalTime, tag, billable });
    return newTask;
  } catch (err) {
    console.error("Error creating task:", err);
    throw new Error("Failed to create task");
  }
};

// PATCH endpoint to update a task by ID
// taskControl.patch("/update/:id", async (req: Request, res: Response): Promise<Response | void> => {

// });

// const taskUpdate = async ({ _id, name, startAt, endAt, totalTime, tag = null, billable = false }) => {
//   try {
//     const updateTask = await TaskModel.findByIdAndUpdate(
//       { _id },
//       { name, startAt, endAt, totalTime, tag, billable },
//       { new: true }
//     );
//     return updateTask;
//   } catch (err) {
//     return err;
//   }
// };

// DELETE endpoint to delete a task by ID
// taskControl.delete("/delete/:id", async (req: Request, res: Response): Promise<Response | void> => {

// });

const taskDelete = async (_,{_id}) => {
  try {
    const taskDelete = await TaskModel.findByIdAndDelete({_id:_id});
    return taskDelete;
  } catch (err) {
    return err;
  }
};

export { getAllTask, createTask, taskDelete };
