import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connect from "./config/connect.js";
import userRouter from "./router/user.js";
import taskRouter from "./router/task.js";
// import { errorMiddleware } from "./middleware/error.js";
import apolloServer from "./config/apolloServer.js";
import { expressMiddleware } from "@apollo/server/express4";
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.get("/", async (req, res) => {
    return res.send("server is running on port ");
});
// connect apollowserver
const startApollowServer = async () => {
    await apolloServer.start();
    app.use("/graphql", expressMiddleware(apolloServer));
};
startApollowServer();
//* listing routes
app.use("/user", userRouter);
app.use("/task", taskRouter);
// app.use(errorMiddleware);
app.listen(PORT, async () => {
    await connect();
    console.log("database connected successfully");
    console.log(`server is running on port ${PORT}`);
});
