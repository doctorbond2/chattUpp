import User from "../models/user.model.js";
import { Response, Request } from "express";
import { compare_password } from "../utilities/helpers/auth.helpers.js";
import {
  generateAccessToken,
  generateAdminToken,
  getBothTokens,
  verifyAccessToken,
  verifyRefreshToken,
  verifyToken,
} from "../utilities/helpers/token.helpers.js";
type TheTokens = {
  access: string;
  refresh: string;
  adminToken?: string;
};
export const loginUser = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Bad request, no login body submitted.",
    });
  }
  const { username, password } = req.body;
  console.log("REQBODY:", req.body);
  if (!password || !username) {
    return res.status(404).json({
      message: "Bad login, no password or username/email submitted.",
    });
  }
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error("Bad login, user not found.");
    }
    const isValidPassword = await compare_password(password, user.password);
    if (isValidPassword) {
      console.log("USERID,", user.id);
      const tokens: TheTokens = await getBothTokens(user.id);
      console.log(tokens);
      if (user.admin) {
        tokens.adminToken = await generateAdminToken(user.id);
      }
      return res.status(200).json(tokens);
    } else {
      return res.status(400).send("Bad login, passwords don't match.");
    }
  } catch (err: any) {
    return res.status(500).json({
      message: "Bad login, unexpected error.",
      error: err.message,
    });
  }
};
export const refreshController = async (req: Request, res: Response) => {
  if (!req.body.refresh) {
    return res.status(400).json({ error: "No body submitted" });
  }
  const { refresh, adminToken } = req.body;
  try {
    console.log("trying new refresh");
    const decodedRefreshToken: any = await verifyRefreshToken(refresh);
    if (decodedRefreshToken) {
      const { userId } = decodedRefreshToken;
      let newTokens: TheTokens = { access: "", refresh: "" };
      newTokens.access = await generateAccessToken(userId);
      newTokens.refresh = refresh;
      if (adminToken) {
        newTokens.adminToken = await generateAdminToken(userId);
      }

      res.status(200).json(newTokens);
    }
  } catch (err) {
    return res.status(401).json({ message: "Token not valid" });
  }
};
export const startUpCheckToken = async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "No auth headers" });
  }

  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  console.log("TOKEN?", token);
  try {
    const decodedToken = await verifyAccessToken(token);
    if (decodedToken) {
      console.log("Token is good");
      return res.status(200).send("");
    }
  } catch (err: any) {
    console.log(err.message);
    return res
      .status(401)
      .json({ message: "Token not valid", error: err.message });
  }
};
