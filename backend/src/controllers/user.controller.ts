import User from "../models/user.model.js";
import { Response, Request } from "express";
import { error_MESSAGE } from "../utilities/helpers/database.helper.js";
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
