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
const secret_key = String(process.env.JWT_ACCESS_SECRET);
const refresh_secret_key = String(process.env.JWT_REFRESH_SECRET);
export const generateAccessToken = (user_db_Id) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = jwt.sign({
        userId: user_db_Id,
    }, secret_key, {
        expiresIn: "1m",
    });
    return accessToken;
});
export const generateRefreshToken = (user_db_Id) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = jwt.sign({
        userId: user_db_Id,
    }, refresh_secret_key, {
        expiresIn: "10m",
    });
    return refreshToken;
});
export const getBothTokens = (user_db_Id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokens = {
            access: yield generateAccessToken(user_db_Id),
            refresh: yield generateRefreshToken(user_db_Id),
        };
        return tokens;
    }
    catch (err) {
        throw err;
    }
});
export const verifyToken = (token, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!token) {
            throw new Error("Not enough data, early stoppage");
        }
        const decodedToken = jwt.verify(token, secret_key);
        if (!decodedToken) {
            if (refreshToken) {
                const decodedRefreshToken = jwt.verify(refreshToken, refresh_secret_key);
                if (decodedRefreshToken) {
                    console.log("Refreshtoken accepted");
                    const newToken = yield generateAccessToken(decodedRefreshToken.userId);
                    return newToken;
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
export const verifyAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return jwt.verify(token, secret_key);
    }
    catch (err) {
        throw err;
    }
});
export const verifyRefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return jwt.verify(token, refresh_secret_key);
    }
    catch (err) {
        throw err;
    }
});
// ÄR EN EGEN ROUTE
export const refreshAccessToken = (req, res) => {
    var _a;
    const authorizationHeader = req.header("Authorization") || "";
    const accessToken = ((_a = authorizationHeader.split(" ")) === null || _a === void 0 ? void 0 : _a[1]) || "";
    const { refreshToken } = req;
    try {
        const decodedRefreshToken = verifyRefreshToken(refreshToken);
    }
    catch (err) {
        throw err;
    }
};
