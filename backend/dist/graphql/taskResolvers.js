import { createTask, getAllTask, taskDelete } from "../controllers/task.js";
// import TaskModel from "../models/task.js";
const taskResolvers = {
    Query: {
        tasks: getAllTask,
    },
    Mutation: {
        createTasks: createTask,
        deleteTask: taskDelete,
        // updateTask: taskUpdate
    }
};
export default taskResolvers;
