import { NextFunction } from "express";
import { CallbackWithoutResultAndOptionalError as nextType } from "mongoose";
import { hashPassword } from "../utilities/helpers/auth.helpers.js";
import bcrypt from "bcrypt";

async function verifyToken(req: Request, res: Response, next: nextType) {
  console.log("test");
  next();
}
