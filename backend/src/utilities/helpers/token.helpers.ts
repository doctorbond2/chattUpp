import jwt from "jsonwebtoken";
import User from "../../models/user.model";
const envSecret = String(process.env.JWT_ACCESS_SECRET);
const envRefreshSecret = String(process.env.JWT_REFRESH_SECRET);
export const generateATokenRToken = async (user_db_Id: typeof User) => {
  const secret = String(process.env.JWT_ACCESS_SECRET);
  const refreshSecret = String(process.env.JWT_REFRESH_SECRET);

  const accesstoken = jwt.sign(
    {
      userId: user_db_Id,
    },
    secret,
    {
      expiresIn: "5m",
    }
  );
  const refreshToken = jwt.sign(
    {
      userId: user_db_Id,
    },
    refreshSecret,
    {
      expiresIn: "28d",
    }
  );
  return {
    access: accesstoken,
    refresh: refreshToken,
  };
};

const verifyToken = async (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, envSecret);
    return decoded;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
