var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Schema, model } from 'mongoose';
import Conversation from './conversation.model.js';
const messageSchema = new Schema({
    textContent: {
        type: String,
        default: 'I am a message',
    },
    sentBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receivedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
    },
}, { timestamps: true });
messageSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingConversation = yield Conversation.findById(this.conversation);
            if (existingConversation) {
                existingConversation.messages.push(this._id);
                yield existingConversation.save();
            }
        }
        catch (err) {
            throw err;
        }
    });
});
const Message = model('Message', messageSchema);
export default Message;
