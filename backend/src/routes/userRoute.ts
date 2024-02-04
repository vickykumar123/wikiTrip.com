import express from "express";
import {AllUsers, currentUser} from "../controllers/userController";
import {protect, restrictedTo} from "../middleware/middleware";

const userRouter = express.Router();

userRouter.get("/", protect, restrictedTo("admin"), AllUsers);
userRouter.get("/current-user", protect, currentUser);
export default userRouter;
