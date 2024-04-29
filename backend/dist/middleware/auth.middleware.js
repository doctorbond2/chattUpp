var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { generateAccessToken, verifyAccessToken, } from '../utilities/helpers/token.helpers.js';
const secret_key = String(process.env.JWT_ACCESS_SECRET);
const refresh_secret = String(process.env.JWT_REFRESH_SECRET);
export function tokenTestOne(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const newToken = yield generateAccessToken(user);
            req.token = newToken;
            console.log(newToken);
            next();
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'hej' });
        }
    });
}
export function tokenTestTwo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.token);
        try {
            const decoded = jwt.verify(req.token, secret_key);
            if (decoded) {
                res.send(decoded);
            }
        }
        catch (err) {
            return res.send('wrong test 2');
        }
    });
}
export function verifyTokensMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.authorization) {
            return res.status(401).send('No access');
        }
        console.log('TOKEN MIDDLEWARE ACTIVATED');
        const { authorization } = req.headers;
        const accessToken = authorization.split(' ')[1];
        try {
            const decodedToken = yield verifyAccessToken(accessToken);
            console.log('Decoded:', decodedToken);
            if (decodedToken) {
                const userId = decodedToken.userId;
                req.userId = userId;
                next();
            }
        }
        catch (err) {
            return res.status(401).json({ error: err });
        }
    });
}
