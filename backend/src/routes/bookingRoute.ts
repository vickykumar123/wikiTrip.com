import express from "express";
import {protect} from "../middleware/middleware";
import {confirmBooking, paymentIntent} from "../controllers/bookingController";

const bookingRouter = express.Router();

bookingRouter.post("/:hotelId/bookings", protect, confirmBooking);
bookingRouter.post("/:hotelId/bookings/payment-intent", protect, paymentIntent);
export default bookingRouter;
