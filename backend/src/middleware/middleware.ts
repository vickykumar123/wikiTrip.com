import {Request, Response, NextFunction} from "express";
import {appError} from "../helpers/appError";
import jwt from "jsonwebtoken";
import User from "../model/userModel";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export async function protect(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(
        appError(401, "🙅🏻🙅🏻 You are not logged-in, Please login to access")
      );
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET!);
    const currentUser = await User.findById(decode);
    req.userId = currentUser!.id;
    next();
  } catch (err) {
    next(err);
  }
}

// Restrict to admin
export const restrictedTo =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.userId).select("+role");
    if (!user) return next(appError(400, "User already exists"));
    if (!roles.includes(user.role!)) {
      return next(appError(403, "You dont have required permission"));
    }
    user.role = undefined;
    next();
  };
