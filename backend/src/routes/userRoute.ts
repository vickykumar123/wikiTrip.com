import express from "express";
import {AllUsers, currentUser, updateUser} from "../controllers/userController";
import {protect, restrictedTo} from "../middleware/middleware";

const userRouter = express.Router();

userRouter.get("/", protect, restrictedTo("admin"), AllUsers);
userRouter.get("/current-user", protect, currentUser);
userRouter.patch("/", protect, updateUser);
export default userRouter;
