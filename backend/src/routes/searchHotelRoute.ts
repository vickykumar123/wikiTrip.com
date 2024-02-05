import express from "express";
import {
  Allhotels,
  hotelDetail,
  hotels,
} from "../controllers/searchHotelController";

const searchRouter = express.Router();
searchRouter.get("/search", hotels);
searchRouter.get("/", Allhotels);
searchRouter.get("/:hotelId", hotelDetail);

export default searchRouter;
