import jwt from 'jsonwebtoken';
import User from '../../models/user.model.js';
const secret_key = String(process.env.JWT_ACCESS_SECRET);
const refresh_secret_key = String(process.env.JWT_REFRESH_SECRET);
interface TokenRequest extends Request {
  refreshToken: string;
  token: string;
}
export const generateAdminToken = async (user_db_Id: typeof User) => {
  const adminToken = jwt.sign(
    {
      userId: user_db_Id,
    },
    secret_key,
    {
      expiresIn: '10m',
    }
  );
  return adminToken;
};
export const generateAccessToken = async (user_db_Id: typeof User) => {
  const accessToken = jwt.sign(
    {
      userId: user_db_Id,
    },
    secret_key,
    {
      expiresIn: '10m',
    }
  );
  return accessToken;
};
export const generateRefreshToken = async (user_db_Id: typeof User) => {
  console.log(user_db_Id);
  try {
    const _user = await User.findById(user_db_Id);
    if (_user) {
      if (_user.admin === true) {
        return jwt.sign(
          {
            userId: user_db_Id,
            admin: true,
          },
          refresh_secret_key,
          {
            expiresIn: '1d',
          }
        );
      } else {
        return jwt.sign(
          {
            userId: user_db_Id,
          },
          refresh_secret_key,
          {
            expiresIn: '1d',
          }
        );
      }
    } else {
      return '';
    }
  } catch (err) {
    throw err;
  }
};
export const getBothTokens = async (user_db_Id: typeof User) => {
  try {
    const tokens = {
      access: await generateAccessToken(user_db_Id),
      refresh: await generateRefreshToken(user_db_Id),
    };
    return tokens;
  } catch (err: any) {
    throw err;
  }
};
export const verifyToken = async (
  token: string,
  refreshToken: string | null
) => {
  try {
    if (!token) {
      throw new Error('Not enough data, early stoppage');
    }
    const decodedToken = jwt.verify(token, secret_key);
    if (!decodedToken) {
      if (refreshToken) {
        const decodedRefreshToken: any = jwt.verify(
          refreshToken,
          refresh_secret_key
        );
        if (decodedRefreshToken) {
          console.log('Refreshtoken accepted');
          const newToken = await generateAccessToken(
            decodedRefreshToken.userId
          );
          return newToken;
        }
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const verifyAccessToken = async (token: string) => {
  try {
    return jwt.verify(token, secret_key);
  } catch (err: any) {
    throw err;
  }
};
export const verifyRefreshToken = async (token: string) => {
  try {
    return jwt.verify(token, refresh_secret_key);
  } catch (err: any) {
    throw err;
  }
};
// ÄR EN EGEN ROUTE
export const refreshAccessToken = (req: any, res: Response) => {
  const authorizationHeader = req.header('Authorization') || '';
  const accessToken = authorizationHeader.split(' ')?.[1] || '';
  const { refreshToken } = req;
  try {
    const decodedRefreshToken = verifyRefreshToken(refreshToken);
  } catch (err: any) {
    throw err;
  }
};
