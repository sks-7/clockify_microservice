import { Router } from "express";
import {
  createTask,
  getAllTask,
  taskDelete,
  taskUpdate,
} from "../controllers/task.js";

const taskRouter = Router();

taskRouter.get("/", getAllTask);
taskRouter.post("/new", createTask);
// taskRouter.put("/:id", taskUpdate);
taskRouter.delete("/delete/:id", taskDelete);

export default taskRouter;
