import { Request, Response, NextFunction } from "express";
import { Session } from "express-session";

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = req.session as Session & {
    user?: { userId: number; userEmail: string; userFirstName: string; userLastName: string };
  };

  if (session.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
