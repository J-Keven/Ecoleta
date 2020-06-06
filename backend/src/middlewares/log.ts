import { NextFunction, Request, Response } from "express";

export default function logMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.time();
  console.log(`Method: ${req.method} URL: ${req.url}`);
  console.timeEnd();

  return next();
}
