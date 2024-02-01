import express from "express";
import {hotels} from "../controllers/searchController";

const searchRouter = express.Router();
searchRouter.get("/search", hotels);

export default searchRouter;
