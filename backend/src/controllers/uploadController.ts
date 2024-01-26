import {NextFunction, Request, Response} from "express";
import util from "util";
import {upload} from "../helpers/upload";
import multer from "multer";

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        location: string;
      }
    }
  }
}

export function uploadSingle(req: Request, res: Response) {
  // req.file contains a file object
  res.status(200).json({status: "success", location: req.file!.location});
}

export function uploadMultiple(req: Request, res: Response) {
  // req.files contains an array of file object
  res.status(200).json({status: "success", message: req.files});
}

export async function uploadSingleV2(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const uploadFile = util.promisify(upload.single("image"));
  try {
    await uploadFile(req, res);
    res.json(req.file);
  } catch (error) {
    next(error);
  }
}
