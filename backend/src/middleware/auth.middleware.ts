import { NextFunction } from "express";
import { CallbackWithoutResultAndOptionalError as nextType } from "mongoose";
import { hashPassword } from "../utilities/helpers/auth.helpers.js";
import bcrypt from "bcrypt";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("test");
  next();
}
