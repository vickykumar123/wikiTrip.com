import {NextFunction, Request, Response} from "express";
import Stripe from "stripe";
import Hotel from "../model/hotelModel";
import {appError} from "../helpers/appError";
import {BookingType} from "../shared/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function paymentIntent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {numberOfNights} = req.body;
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return next(appError(404, "Hotel Not Found"));
    }
    const dollarPerRupee = 70;
    const rupeeToDollar = (hotel.pricePerNight / dollarPerRupee).toFixed(2);
    const totalCost = parseInt(rupeeToDollar) * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalCost),
      currency: "usd",
      metadata: {
        hotelId,
        userId: req.user._id,
      },
    });

    if (!paymentIntent.client_secret) {
      return next(appError(500, "Error in creating payment intent"));
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    res.status(200).json({
      status: "success",
      response,
    });
  } catch (err) {
    next(err);
  }
}

export async function confirmBooking(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const paymentIntentId = req.body.paymentIntentId;

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    );

    if (!paymentIntent) {
      return res.status(400).json({message: "payment intent not found"});
    }

    // From unintended attacker
    if (
      paymentIntent.metadata.hotelId !== req.params.hotelId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      return res.status(400).json({message: "payment intent mismatch"});
    }

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
      });
    }

    const newBooking: BookingType = {
      ...req.body,
      userId: req.user._id,
    };

    const hotel = await Hotel.findOneAndUpdate(
      {_id: req.params.hotelId},
      {
        $push: {bookings: newBooking},
      }
    );

    console.log(hotel);
    if (!hotel) {
      return res.status(400).json({message: "hotel not found"});
    }

    await hotel.save();
    res.status(200).json({
      status: "success",
      message: "Booking is Successfull",
      hotel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "something went wrong"});
  }
}
