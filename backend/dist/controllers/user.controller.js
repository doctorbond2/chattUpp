var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user.model.js";
import { error_MESSAGE } from "../utilities/helpers/database.helper.js";
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hejhej");
    if (!req.body) {
        return res.status(400).json({
            message: "Bad request.",
            error: "No user body submitted.",
        });
    }
    try {
        const user = new User(req.body);
        const result = yield user.save();
        if (result) {
            console.log(result);
            return res.status(201).json({ new_user: result });
        }
    }
    catch (err) {
        console.log(error_MESSAGE("post"), err);
        return res.status(400).json({
            message: "Error creating user",
            error: err.message,
        });
    }
});
