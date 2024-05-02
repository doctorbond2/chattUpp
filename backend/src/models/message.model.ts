import { Schema, model } from 'mongoose';
import Conversation from './conversation.model.js';
const messageSchema = new Schema(
  {
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
  },
  { timestamps: true }
);
messageSchema.pre('save', async function () {
  try {
    const existingConversation: any = await Conversation.findById(
      this.conversation
    );
    if (existingConversation) {
      existingConversation.messages.push(this._id);
      await existingConversation.save();
    }
  } catch (err) {
    throw err;
  }
});

const Message = model('Message', messageSchema);
export default Message;
