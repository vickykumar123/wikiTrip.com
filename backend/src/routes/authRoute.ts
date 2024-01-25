import express from "express";
import {createUser, login, validateToken} from "../controllers/authController";
import {protect} from "../middleware/middleware";

const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", login);
authRouter.get("/validate-token", protect, validateToken);

export default authRouter;
