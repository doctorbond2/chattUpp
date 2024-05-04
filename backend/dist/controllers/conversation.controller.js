var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Conversation from '../models/conversation.model.js';
export const createNewConvoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req;
    const { friendId } = req.body;
    try {
        const existingConversation = yield Conversation.findOne({
            participants: { $all: [userId, friendId] },
        }).populate('participants', { username: 1, firstname: 1, lastname: 1 });
        if (existingConversation) {
            if (existingConversation.messages.length > 0) {
                console.log('messages: ', (_a = existingConversation.messages) === null || _a === void 0 ? void 0 : _a.length);
                yield existingConversation.populate({
                    path: 'messages',
                    options: { limit: 50, sort: { createdAt: -1 } },
                });
            }
            console.log('Sent back existing conversation between: ', existingConversation.participants[0].firstname, ' and ', existingConversation.participants[1].firstname);
            return res.status(200).json(existingConversation);
        }
        else {
            const newConversation = new Conversation({
                participants: [userId, friendId],
                active: true,
            });
            yield newConversation.save();
            console.log('Created a new conversation');
            return res.status(201).json(newConversation);
        }
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
});
export const updateConvo = () => { };
export const deactivateConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { friendId } = req.body;
    try {
        const existingConversation = yield Conversation.findOne({
            participants: { $all: [userId, friendId] },
        }).populate('participants', { username: 1, firstname: 1, lastname: 1 });
        if (existingConversation) {
            existingConversation.active = false;
            console.log('Deactivating conversation between: ', existingConversation.participants[0].firstname, ' and ', existingConversation.participants[1].firstname);
            yield existingConversation.save();
            return res.status(200).json(existingConversation);
        }
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
});
export const getConversations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hi');
    const { userId } = req;
    try {
        const _conversations = yield Conversation.find({
            participants: userId,
        }).populate('participants', {
            firstname: 1,
            lastname: 1,
            avatar: 1,
            username: 1,
        });
        if (_conversations) {
            return res.status(200).json(_conversations);
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});
