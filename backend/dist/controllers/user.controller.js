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
import { compare_password } from "../middleware/auth.middleware.js";
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const user = yield User.findOne({ username: username });
            if (!user) {
                return res.status(404).json({
                    message: "Bad login, user not found.",
                });
            }
            const isValidPassword = yield compare_password(password, user.password);
            if (isValidPassword) {
                const isAdmin = (user === null || user === void 0 ? void 0 : user.role) === "admin" ? true : false;
                return res.status(200).json({
                    message: (user === null || user === void 0 ? void 0 : user.username) + " is logged in!",
                    access: isAdmin,
                    user: user === null || user === void 0 ? void 0 : user._id,
                });
            }
            else {
                return res.status(400).send("Bad login, passwords don't match.");
            }
        }
        catch (err) {
            return res.status(404).json({
                message: "Bad login, unexpected error.",
                error: err.message,
            });
        }
    }
    else {
        return res.status(404).json({
            message: "Bad login, no username/email submitted.",
        });
    }
});
export const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Test backend");
    if (!req.params.id) {
        return res.status(400).json({
            message: "Bad request, no profile ID provided.",
        });
    }
    const { id } = req.params;
    try {
        const user = yield User.findOne({ _id: id });
        if (user) {
            res.status(200).json(user);
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Unexpected error.",
            error: err.message,
        });
    }
});
