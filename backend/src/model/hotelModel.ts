import mongoose, {Document, PopulatedDoc} from "mongoose";
import {BookingType, HotelType} from "../shared/types";

const bookingSchema = new mongoose.Schema<BookingType>({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  adultCount: {type: Number, required: true},
  childCount: {type: Number, required: true},
  checkIn: {type: Date, required: true},
  checkOut: {type: Date, required: true},
  userId: {type: String, required: true},
  totalCost: {type: Number, required: true},
});

const hotelSchema = new mongoose.Schema<HotelType>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "User",
    },
    hotelName: {
      type: String,
      required: [true, "Hotel name is required"],
      unique: true,
    },
    city: {type: String, required: [true, "This field is required"]},
    country: {type: String, required: [true, "This field is required"]},
    description: {type: String, required: [true, "This field is required"]},
    bed: {type: Number, required: [true, "This field is required"]},
    breakfast: {type: String, required: [true, "This field is required"]},
    type: {type: String, required: [true, "This field is required"]},
    adultCount: {type: Number, required: [true, "This field is required"]},
    childCount: {type: Number, required: [true, "This field is required"]},
    facilities: [{type: String, required: [true, "This field is required"]}],
    pricePerNight: {type: Number, required: [true, "This field is required"]},
    starRating: {
      type: Number,
      required: [true, "This field is required"],
      min: 1,
      max: 5,
    },
    imageUrls: [{type: String, required: [true, "This field is required"]}],
    lastUpdated: {type: Date, required: [true, "This field is required"]},
    bookings: [bookingSchema],
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);
export default Hotel;
