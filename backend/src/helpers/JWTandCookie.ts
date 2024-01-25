import {Response} from "express";
import jwt from "jsonwebtoken";

export function createJWTandCookie(res: Response, id: string) {
  const token = jwt.sign({_id: id}, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE!),
    httpOnly: true,
    maxAge: 86400000, //1 day in ms
  });
  return token;
}
