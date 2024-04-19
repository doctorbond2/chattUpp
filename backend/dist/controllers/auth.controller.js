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
import { compare_password } from "../utilities/helpers/auth.helpers.js";
import { getBothTokens, } from "../utilities/helpers/token.helpers.js";
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield User.findOne({ username: username });
        if (!user) {
            throw new Error("Bad login, user not found.");
        }
        const isValidPassword = yield compare_password(password, user.password);
        if (isValidPassword) {
            console.log("USERID,", user.id);
            const tokens = yield getBothTokens(user.id);
            return res.status(200).json(tokens);
        }
        else {
            return res.status(400).send("Bad login, passwords don't match.");
        }
    }
    catch (err) {
        return res.status(500).json({
            message: "Bad login, unexpected error.",
            error: err.message,
        });
    }
});
