import express from "express";
import {upload} from "../helpers/upload";
import {protect} from "../middleware/middleware";
import {createHotel} from "../controllers/hotelController";

const hotelRouter = express.Router();

hotelRouter.post(
  "/create-hotel",
  protect,
  upload.array("images", 6),
  createHotel
);

export default hotelRouter;
