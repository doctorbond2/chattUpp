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
import Message from '../models/message.model.js';
export function addNewMessageToConversationController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('HELLO FROM THE MESSAGE CONTROLLER!');
        const { userId } = req;
        const { receivedBy, textContent } = req.body;
        console.log(userId, receivedBy, textContent);
        try {
            const _currentConversation = yield Conversation.findOne({
                participants: { $all: [userId, receivedBy] },
            });
            if (_currentConversation) {
                console.log('Found the conversation np');
                const newMessage = new Message({
                    textContent: textContent,
                    sentBy: userId,
                    receivedBy: receivedBy,
                    conversation: _currentConversation._id,
                });
                yield newMessage.save();
                return res.status(201).json({ message: 'Created!' });
            }
        }
        catch (err) {
            console.log('Something went wrong adding new message');
            console.log(err.message);
            return res.status(500);
        }
    });
}
export function deleteAllTheMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Message.find().deleteMany();
            res.status(204).send('');
        }
        catch (err) {
            console.log(err.message);
        }
    });
}
