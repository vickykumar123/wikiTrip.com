import {NextFunction, Request, Response} from "express";
import {appError} from "../helpers/appError";
import Hotel, {HotelType} from "../model/hotelModel";

export async function createHotel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.files) return next(appError(400, "Upload atleast one image"));
    const imagesFile = req.files as Express.Multer.File[];
    const imageURLs = imagesFile.map((image) => image.location);
    const hotelData: HotelType = req.body;
    hotelData.imageUrls = imageURLs;
    hotelData.lastUpdated = new Date();
    hotelData.user = req.user;

    const hotel = new Hotel(hotelData);
    await hotel.save();
    res.status(200).json({
      status: "success",
      hotel,
    });
  } catch (err) {
    next(err);
  }
}