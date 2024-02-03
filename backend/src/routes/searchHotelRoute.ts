import express from "express";
import {hotelDetail, hotels} from "../controllers/searchHotelController";

const searchRouter = express.Router();
searchRouter.get("/search", hotels);
searchRouter.get("/:hotelId", hotelDetail);

export default searchRouter;
