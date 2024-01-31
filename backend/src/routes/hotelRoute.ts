import express from "express";
import {upload} from "../helpers/upload";
import {protect} from "../middleware/middleware";
import {
  createHotel,
  hotelById,
  myHotel,
  updateHotel,
} from "../controllers/hotelController";

const hotelRouter = express.Router();

hotelRouter.post(
  "/create-hotel",
  protect,
  upload.array("images", 6),
  createHotel
);
hotelRouter.get("/my-hotel", protect, myHotel);
hotelRouter.get("/:hotelId", protect, hotelById);
hotelRouter.patch("/:hotelId", protect, upload.array("images", 6), updateHotel);

export default hotelRouter;
