import { Request, Response, NextFunction } from "express";

interface User {
  role: string;
}

interface AdminRequest extends Request {
  user: User;
}

export const adminMiddleware = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
