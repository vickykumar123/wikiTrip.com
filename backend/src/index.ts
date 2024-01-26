import express, {NextFunction, Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRoute";
import authRouter from "./routes/authRoute";
import path from "path";

// const __dirname = path.resolve();

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log("Connected to the Database successfully"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on localhost:3000");
});

//For render deployment
app.use(express.static(path.join(process.cwd(), "../frontend/dist")));
//This will solve manual refresh issue
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
});

//Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

//Error
interface Error {
  statusCode?: number;
  message?: string;
}
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
  if (err.message!.startsWith("E110")) {
    message = "Name already exist";
  }

  return res.status(statusCode).json({
    status: "failed",
    message,
  });
});
