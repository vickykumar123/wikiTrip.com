import {NextFunction, Request, Response} from "express";
import Hotel from "../model/hotelModel";
import {HotelType} from "../shared/types";

export async function myBooking(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const hotels = await Hotel.find({
      bookings: {$elemMatch: {userId: req.user._id}},
    }).sort({createdAt: -1});

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings!.filter(
        (booking) => booking.userId === req.user._id.toString()
      );

      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };
      return hotelWithUserBookings;
    });

    res.status(200).json({
      status: "success",
      results,
    });
  } catch (error) {
    next(error);
  }
}
