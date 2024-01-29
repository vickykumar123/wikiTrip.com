import mongoose, {Document, PopulatedDoc} from "mongoose";
import {UserType} from "./userModel";

export type HotelType = {
  _id: string;
  user: PopulatedDoc<UserType & Document>;
  hotelName: string;
  city: string;
  country: string;
  description: string;
  bed: number;
  breakfast: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};

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
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);
export default Hotel;
