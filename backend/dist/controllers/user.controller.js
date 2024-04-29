var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/user.model.js';
import { error_MESSAGE } from '../utilities/helpers/database.helper.js';
import { verifyAccessToken } from '../utilities/helpers/token.helpers.js';
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return res.status(400).json({
            message: 'Bad request.',
            error: 'No user body submitted.',
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
        console.log(error_MESSAGE('post'), err);
        return res.status(400).json({
            message: 'Error creating user',
            error: err.message,
        });
    }
});
export const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return res.status(400).json({
            message: 'Bad request.',
            error: 'No user body submitted.',
        });
    }
    if (!req.params.id) {
        return res.status(400).json({
            message: 'Bad request.',
            error: 'No user id submitted.',
        });
    }
    const { id } = req.params;
    try {
        const _user = yield User.findByIdAndUpdate({ _id: id }, req.body);
        if (_user) {
            res.status(200).send({ message: 'Updated' });
        }
    }
    catch (err) {
        console.log(error_MESSAGE('post'), err);
        return res.status(400).json({
            message: 'Error creating user',
            error: err.message,
        });
    }
});
export const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Test backend');
    if (!req.params.id) {
        return res.status(400).json({
            message: 'Bad request, no profile ID provided.',
        });
    }
    const { id } = req.params;
    console.log('id: ', id);
    try {
        const user = yield User.findById(id);
        if (user) {
            res.status(200).json(user);
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: 'Unexpected error.',
            error: err.message,
        });
    }
});
export const detailedUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return res.status(401).send('No access');
    }
    console.log('TRIGGERED!');
    const { authorization } = req.headers;
    const accessToken = authorization.split(' ')[1];
    try {
        const decodedToken = yield verifyAccessToken(accessToken);
        console.log('Decoded:', decodedToken);
        if (decodedToken) {
            const userId = decodedToken.userId;
            const _user = yield User.findById(userId)
                .populate('friends', {
                firstname: 1,
                friends: 1,
            })
                .populate('conversations');
            res.status(200).json(_user);
        }
    }
    catch (err) {
        return res.status(401).json({ error: err });
    }
});
export const getUserList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 10;
    let pageSkip = page - 1;
    try {
        let _users = yield User.find().skip(pageSkip).limit(pageSize);
        res.status(200).json(_users);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Unexpected error.',
            error: err.message,
        });
    }
});
