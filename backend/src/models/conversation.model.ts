import { Schema, model } from 'mongoose';

const conversationSchema = new Schema(
  {
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
    messages: {
      type: [Schema.Types.ObjectId],
      ref: 'Message',
      required: true,
      default: [],
    },
  },
  { timestamps: true, index: true }
);
const Conversation = model('Conversation', conversationSchema);
export default Conversation;
