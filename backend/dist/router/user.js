import { Router } from "express";
import { forgotPassword, loginUser, resetPassword, resetPasswordVerifyuser, userSignUp } from "../controllers/user.js";
const userRouter = Router();
userRouter.post("/login", loginUser);
userRouter.post("/signup", userSignUp);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.get("/reset-password/:id/:forgotToken", resetPasswordVerifyuser);
userRouter.get("/:id/:forgotToken", resetPassword);
export default userRouter;
