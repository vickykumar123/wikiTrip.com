import express from "express";
import {protect} from "../middleware/middleware";
import {myBooking} from "../controllers/myBookingController";

const myBookingRouter = express.Router();

myBookingRouter.get("/", protect, myBooking);

export default myBookingRouter;
