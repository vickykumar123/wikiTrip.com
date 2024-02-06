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

export async function currentUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    if (!user) {
      return next(appError(403, "No user found"));
    }
    res.status(200).json({
      message: "success",
      user,
    });
  } catch (err) {
    next(err);
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user._id.toString() !== req.body.id.toString())
      return next(
        appError(
          403,
          "You are not authorized to make changes to others account"
        )
      );

    const user = await User.findById(req.user._id.toString());
    if (!user) return;
    user.avatar = req.body.avatar || user.avatar;
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;

    if (req.body.password) {
      user.password = req.body.password;
      user.passwordConfirm = req.body.password;
      await user.save();
    }

    await user.save({validateBeforeSave: false});

    res.status(201).json({
      status: "success",
      message: "User updated successfully..",
      user,
    });
  } catch (err) {
    next(err);
  }
};
