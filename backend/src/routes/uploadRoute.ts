import express from "express";
import {
  uploadMultiple,
  uploadSingle,
  uploadSingleV2,
} from "../controllers/uploadController";
import {upload} from "../helpers/upload";
import {protect} from "../middleware/middleware";

const uploadRouter = express.Router();

uploadRouter.post(
  "/upload-single",
  protect,
  upload.single("image"),
  uploadSingle
);
uploadRouter.post(
  "/upload-multiple",
  protect,
  upload.array("images", 6),
  uploadMultiple
);

/* ------------------------ upload and error handling ----------------------- */
uploadRouter.post("/upload-single-v2", uploadSingleV2);

export default uploadRouter;
