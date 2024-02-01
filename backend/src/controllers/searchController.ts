import {NextFunction, Request, Response} from "express";
import Hotel from "../model/hotelModel";
import {HotelSearchResponse} from "../shared/types";

export async function hotels(req: Request, res: Response, next: NextFunction) {
  try {
    const pageSize = 6;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );

    const skip = (pageNumber - 1) * pageSize;
    const hotels = await Hotel.find().skip(skip).limit(pageSize);
    const totalDocument = await Hotel.countDocuments();
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
