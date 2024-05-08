import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import {
  generateAccessToken,
  verifyAccessToken,
} from '../utilities/helpers/token.helpers.js';
import {
  compare_password,
  compare_api_keys,
} from '../utilities/helpers/auth.helpers.js';
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
  try {
    const decoded = jwt.verify(req.token, secret_key);
    if (decoded) {
      res.send(decoded);
    }
  } catch (err) {
    return res.send('wrong test 2');
  }
}
export async function verifyAccessTokenMiddleware(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    return res.status(401).send('No access');
  }
  const { authorization } = req.headers;
  const accessToken = authorization.split(' ')[1];
  try {
    const decodedToken: any = await verifyAccessToken(accessToken);
    if (decodedToken) {
      const userId = decodedToken.userId;
      req.userId = userId;
      next();
    }
  } catch (err) {
    return res.status(401).json({ error: err });
  }
}
export async function VerifyKeyMiddleware(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  console.log('JABABA');
  const key = req.headers['x-client-key'];
  console.log(key);
  try {
    if (compare_api_keys(key)) {
      console.log('Good!');
      next();
    } else {
      return res
        .status(401)
        .send('Bloop bloop what u tryna do bloop bloop bloop');
    }
  } catch (err) {
    return res
      .status(401)
      .send('Bloop bloop what u tryna do bloop bloop bloop');
  }
}
