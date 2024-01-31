import {NextFunction, Request, Response} from "express";
import {appError} from "../helpers/appError";
import Hotel from "../model/hotelModel";
import {HotelType} from "../shared/model.types";

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

export async function myHotel(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return next(appError(400, "Please login to access your listing"));
    }
    const myHotel = await Hotel.find({user: req.user});
    res.status(200).json({
      status: "success",
      results: myHotel.length,
      myHotel,
    });
  } catch (err) {
    next(err);
  }
}

export async function hotelById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const hotelId = req.params.hotelId.toString();
  try {
    const hotel = await Hotel.findOne({_id: hotelId, user: req.user});
    res.status(200).json({
      status: "success",
      hotel,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateHotel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();

    const hotel = await Hotel.findByIdAndUpdate(
      {
        _id: req.params.hotelId,
        user: req.user,
      },
      updatedHotel,
      {new: true}
    );

    if (!hotel) return next(appError(404, "Hotel not found"));

    if (JSON.stringify(req.user._id) !== JSON.stringify(hotel!.user._id)) {
      return next(appError(401, "You are not authorized to edit this hotel"));
    }

    const imagesFile = req.files as Express.Multer.File[];
    const imageURLs = imagesFile.map((image) => image.location);
    hotel.imageUrls = [...imageURLs, ...(updatedHotel.imageUrls || [])];

    await hotel.save();

    res.status(200).json({
      message: "success",
      hotel,
    });
  } catch (err) {
    next(err);
  }
}
