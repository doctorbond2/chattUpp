import jwt from "jsonwebtoken";
import User from "../../models/user.model";
import { nextTick } from "process";
import { AnyError } from "mongodb";
const secret_key = String(process.env.JWT_ACCESS_SECRET);
const refresh_secret = String(process.env.JWT_REFRESH_SECRET);
interface TokenRequest extends Request {
  refreshToken: string;
  token: string;
}
export const generateATokenRToken = async (user_db_Id: typeof User) => {
  const accesstoken = jwt.sign(
    {
      userId: user_db_Id,
    },
    secret_key,
    {
      expiresIn: "1m",
    }
  );
  const refreshToken = jwt.sign(
    {
      userId: user_db_Id,
    },
    refresh_secret,
    {
      expiresIn: "28d",
    }
  );
  return {
    access: accesstoken,
    refresh: refreshToken,
  };
};
export const generateAccessToken = async (user_db_Id: typeof User) => {
  const accessToken = jwt.sign(
    {
      userId: user_db_Id,
    },
    secret_key,
    {
      expiresIn: "1m",
    }
  );
};
const verifyToken = async (
  token: string,
  refreshToken: string | null,
  secret: string
) => {
  try {
    if (!secret || !token) {
      throw new Error("Not enough data, early stoppage");
    }
    const decodedToken = jwt.verify(token, secret_key);
    if (!decodedToken) {
      if (refreshToken) {
        const decodedRefreshToken: any = jwt.verify(refreshToken, secret_key);
        if (decodedRefreshToken) {
          console.log("Refreshtoken accepted");
          const newToken = generateATokenRToken(decodedRefreshToken.userId);
        }
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const verifyAccessToken = async (token: string) => {
  try {
    return jwt.verify(token, secret_key);
  } catch (err: any) {
    throw err;
  }
};
const verifyRefreshToken = async (token: string) => {
  try {
    return jwt.verify(token, refresh_secret);
  } catch (err: any) {
    throw err;
  }
};
// ÄR EN EGEN ROUTE
const refreshAccessToken = (req: any, res: Response) => {
  const authorizationHeader = req.header("Authorization") || "";
  const accessToken = authorizationHeader.split(" ")?.[1] || "";
  const { refreshToken } = req;
  try {
    const decodedRefreshToken = verifyRefreshToken(refreshToken);
  } catch (err: any) {
    throw err;
  }
};
