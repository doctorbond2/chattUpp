import { Schema, model } from 'mongoose';
const conversationSchema = new Schema({
    participants: {
        user1: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        user2: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
}, { timestamps: true });
const Conversation = model('Conversation', conversationSchema);
