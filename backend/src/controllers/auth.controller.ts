import User from "../models/user.model.js";
import { Response, Request } from "express";
import { compare_password } from "../utilities/helpers/auth.helpers.js";
import {
  generateAccessToken,
  getBothTokens,
} from "../utilities/helpers/token.helpers.js";

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
      const tokens = await getBothTokens(user.id);
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
