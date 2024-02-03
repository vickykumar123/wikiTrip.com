import {NextFunction, Request, Response} from "express";
import Hotel from "../model/hotelModel";
import {HotelSearchResponse} from "../shared/types";
import {constructSearchQuery} from "../helpers/searchQuery";
import {appError} from "../helpers/appError";

export async function hotels(req: Request, res: Response, next: NextFunction) {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOptions) {
      case "starRating":
        sortOptions = {starRating: -1};
        break;
      case "pricePerNightAsc":
        sortOptions = {pricePerNight: 1};
        break;
      case "pricePerNightDesc":
        sortOptions = {pricePerNight: -1};
        break;
      case "lastest":
        sortOptions = {lastUpdated: -1};
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );

    const skip = (pageNumber - 1) * pageSize;
    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    const totalDocument = await Hotel.countDocuments(query);
    const response: HotelSearchResponse = {
      hotels,
      pagination: {
        totalDocument,
        page: pageNumber,
        pages: Math.ceil(totalDocument / pageSize),
      },
    };
    res.status(200).json({
      status: "success",
      response,
    });
  } catch (err) {
    next(err);
  }
}

export async function hotelDetail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.hotelId) {
      return next(appError(401, "Hotel id is required"));
    }
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return next(appError(404, "No Hotel found"));
    }
    res.status(200).json({
      status: "success",
      hotel,
    });
  } catch (err) {
    next(err);
  }
}
