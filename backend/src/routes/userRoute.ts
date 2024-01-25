import express from "express";
import {AllUsers} from "../controllers/userController";
import {protect, restrictedTo} from "../middleware/middleware";

const userRouter = express.Router();

userRouter.get("/", protect, restrictedTo("admin"), AllUsers);
export default userRouter;
