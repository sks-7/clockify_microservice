import express, { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/statuscode.js";
import { ControllerType } from "../types/errortype.js";

const errorMiddleware = (
  err: ErrorHandler,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

const TryCatch =
  (func: ControllerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };

// const a = TryCatch()

export { errorMiddleware, TryCatch };
