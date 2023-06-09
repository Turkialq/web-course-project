import { Request, Response, NextFunction } from "express";

// this is custom error middleware for easier error logs
function notFound(req: Request, res: Response, next: NextFunction) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

// this is custom error middleware for easier error logs
function errorHandler(err: any, res: Response) {
  // If the status code is 200, set it to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // If the error is a validation error, set the status code to 400
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
}

export { notFound, errorHandler };
