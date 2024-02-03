import express from "express";
import {
  createUser,
  google,
  login,
  logout,
  validateToken,
} from "../controllers/authController";
import {protect} from "../middleware/middleware";

const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", login);
authRouter.post("/logout", protect, logout);
authRouter.get("/validate-token", protect, validateToken);

authRouter.post("/google", google);

export default authRouter;
