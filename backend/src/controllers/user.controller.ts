import User from "../models/user.model.js";
import { Response, Request } from "express";
import { error_MESSAGE } from "../utilities/helpers/database.helper.js";
import { compare_password } from "../middleware/auth.middleware.js";
export const createUser = async (req: Request, res: Response) => {
  console.log("hejhej");
  if (!req.body) {
    return res.status(400).json({
      message: "Bad request.",
      error: "No user body submitted.",
    });
  }
  try {
    const user = new User(req.body);
    const result = await user.save();
    if (result) {
      console.log(result);
      return res.status(201).json({ new_user: result });
    }
  } catch (err: any) {
    console.log(error_MESSAGE("post"), err);
    return res.status(400).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};
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
        return res.status(404).json({
          message: "Bad login, user not found.",
        });
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
