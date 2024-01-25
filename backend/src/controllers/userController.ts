import {NextFunction, Request, Response} from "express";
import User from "../model/userModel";
import {appError} from "../helpers/appError";

export async function AllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const allUser = await User.find();

    res.status(200).json({
      status: 200,
      result: allUser.length,
      allUser,
    });
  } catch (err) {
    next(err);
  }
}
