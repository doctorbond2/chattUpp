import { Schema, model } from 'mongoose';
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
const Message = model('Message', messageSchema);
export default Message;
