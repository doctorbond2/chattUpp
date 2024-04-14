import User from "../models/user.model.js";
import { Response, Request } from "express";
import { compare_password } from "../utilities/helpers/auth.helpers.js";
import { hashPassword } from "../utilities/helpers/auth.helpers.js";

export const loginUser = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Bad request, no login body submitted.",
    });
  }
  const { username, password, email } = req.body;
  console.log("REQBODY:", req.body);
  if (!password) {
    return res.status(404).json({
      message: "Bad login, no password or username/email submitted.",
    });
  }
  if (username) {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        throw new Error("Bad login, user not found.");
      }
      const isValidPassword = await compare_password(password, user.password);
      if (isValidPassword) {
        const isAdmin = user?.role === "admin" ? true : false;
        return res.status(200).json({
          message: user?.username + " is logged in!",
          access: isAdmin,
          user: user?._id,
        });
      } else {
        return res.status(400).send("Bad login, passwords don't match.");
      }
    } catch (err: any) {
      return res.status(404).json({
        message: "Bad login, unexpected error.",
        error: err.message,
      });
    }
  } else {
    return res.status(404).json({
      message: "Bad login, no username/email submitted.",
    });
  }
};
