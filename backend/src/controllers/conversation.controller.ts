import Conversation from '../models/conversation.model.js';
import { Response, Request } from 'express';

export const createNewConvoController = async (
  req: Request | any,
  res: Response
) => {
  const { userId } = req;
  const { friendId } = req.body;
  try {
    const existingConversation: any = await Conversation.findOne({
      participants: { $all: [userId, friendId] },
    }).populate('participants');
    if (existingConversation) {
      console.log(
        'Sent back existing conversation between: ',
        existingConversation.participants[0].firstname,
        existingConversation.participants[1].firstname
      );
      return res.status(200).json(existingConversation);
    } else {
      const newConversation = new Conversation({
        participants: [userId, friendId],
      });
      await newConversation.save();
      console.log('Created a new conversation');
      return res.status(201).json(newConversation);
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};