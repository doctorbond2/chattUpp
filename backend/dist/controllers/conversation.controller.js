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
import User from '../models/user.model.js';
import Message from '../models/message.model.js';
export const createNewConvoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req;
    const { friendId } = req.body;
    try {
        const existingConversation = yield Conversation.findOne({
            participants: { $all: [userId, friendId] },
        }).populate('participants', { username: 1, firstname: 1, lastname: 1 });
        if (existingConversation) {
            if (!existingConversation.active) {
                return res.status(401).send('');
            }
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
            const _you = yield User.findById(userId);
            const _they = yield User.findById(friendId);
            if (_you && _they) {
                _you.conversations.push(newConversation._id);
                _they.conversations.push(newConversation._id);
                yield _you.save();
                yield _they.save();
            }
            yield newConversation.save();
            yield newConversation.populate('participants', {
                username: 1,
                firstname: 1,
                lastname: 1,
            });
            console.log('Created a new conversation');
            return res.status(201).json(newConversation);
        }
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
});
export const createOneNewConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { friendId } = req.body;
    try {
        const newConversation = new Conversation({
            participants: [userId, friendId],
            active: true,
        });
        const _you = yield User.findById(userId);
        const _they = yield User.findById(friendId);
        if (_you && _they) {
            _you.conversations.push(newConversation._id);
            _they.conversations.push(newConversation._id);
            yield _you.save();
            yield _they.save();
        }
        yield newConversation.save();
        yield newConversation.populate('participants', {
            username: 1,
            firstname: 1,
            lastname: 1,
        });
        console.log('Created a new conversation');
        return res.status(201).json(newConversation);
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
});
export const activateConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { friendId } = req.body;
    console.log('Test: ', userId, friendId);
    try {
        const existingConversation = yield Conversation.findOne({
            participants: { $all: [userId, friendId] },
        });
        console.log(existingConversation);
        if (existingConversation) {
            existingConversation.active = true;
            console.log('Activating conversation between: ', existingConversation.participants[0].firstname, ' and ', existingConversation.participants[1].firstname);
            yield existingConversation.save();
            return res.status(200).json(existingConversation);
        }
        else {
            return res.status(204).send('No conversation found.');
        }
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
});
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
        else {
            return res.status(204).send('No conversation found.');
        }
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
});
export const getConversations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    try {
        let conversationsResponse = [];
        const active_conversations = yield Conversation.find({
            participants: userId,
            active: true,
        })
            .populate('participants', {
            firstname: 1,
            lastname: 1,
            avatar: 1,
            username: 1,
            updatedAt: 1,
        })
            .sort({ updatedAt: -1 });
        const nonActive_conversations = (yield Conversation.find({
            participants: userId,
            active: false,
        })
            .populate('participants', {
            firstname: 1,
            lastname: 1,
            avatar: 1,
            username: 1,
            updatedAt: 1,
        })
            .sort({ updatedAt: 1 })) || [];
        if (active_conversations.length > 0 || nonActive_conversations.length > 0) {
            conversationsResponse = [
                ...active_conversations,
                ...nonActive_conversations,
            ];
            return res.status(200).json(conversationsResponse);
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});
export const deleteConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.status(404).send('no id');
    }
    const { id } = req.params;
    try {
        yield Message.deleteMany({ conversation: id });
        yield Conversation.deleteOne({ _id: id });
        console.log('Deleted');
        res.status(204).send('');
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json('');
    }
});
export const deleteConvoAndMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(404).json({ error: 'ID not found.' });
    }
    const { userId } = req;
    const { id } = req.params;
    try {
        const existingConversation = yield Conversation.findOne({
            participants: { $all: [userId, id] },
        });
        console.log('EXISTING: ', existingConversation);
        yield Message.deleteMany({ conversation: existingConversation._id });
        yield Conversation.deleteOne({ _id: existingConversation._id });
        console.log('Deleted');
        res.status(204).send('');
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json('');
    }
});
export const getOneConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(404).json({ error: 'ID not found.' });
    }
    const { id } = req.params;
    try {
        const existingConversation = yield Conversation.findById(id);
        if (existingConversation) {
            res.status(200).json(existingConversation);
        }
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json('');
    }
});
