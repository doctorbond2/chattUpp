import { Schema, model } from 'mongoose';

const conversationSchema = new Schema(
  {
    participants: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'User',
      maxLength: 2,
      minLength: 2,
    },
    messages: {
      type: [Schema.Types.ObjectId],
      ref: 'Message',
      default: [],
      index: true,
    },
  },
  { timestamps: true }
);
const Conversation = model('Conversation', conversationSchema);
export default Conversation;
