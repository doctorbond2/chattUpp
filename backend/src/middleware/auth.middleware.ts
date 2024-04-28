import express, { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { CallbackWithoutResultAndOptionalError as n } from 'mongoose';
import { hashPassword } from '../utilities/helpers/auth.helpers.js';
import {
  generateAccessToken,
  verifyAccessToken,
} from '../utilities/helpers/token.helpers.js';
import { compare_password } from '../utilities/helpers/auth.helpers.js';
import bcrypt from 'bcrypt';
const secret_key = String(process.env.JWT_ACCESS_SECRET);
const refresh_secret = String(process.env.JWT_REFRESH_SECRET);

export async function tokenTestOne(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const user = req.body;
  try {
    const newToken = await generateAccessToken(user);
    req.token = newToken;
    console.log(newToken);
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'hej' });
  }
}
export async function tokenTestTwo(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  console.log(req.token);
  try {
    const decoded = jwt.verify(req.token, secret_key);
    if (decoded) {
      res.send(decoded);
    }
  } catch (err) {
    return res.send('wrong test 2');
  }
}
