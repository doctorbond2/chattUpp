var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
export const generateATokenRToken = (user_db_Id) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = String(process.env.JWT_ACCESS_SECRET);
    const refreshSecret = String(process.env.JWT_REFRESH_SECRET);
    const accesstoken = jwt.sign({
        userId: user_db_Id,
    }, secret, {
        expiresIn: "5m",
    });
    const refreshToken = jwt.sign({
        userId: user_db_Id,
    }, refreshSecret, {
        expiresIn: "28d",
    });
    return {
        access: accesstoken,
        refresh: refreshToken,
    };
});
