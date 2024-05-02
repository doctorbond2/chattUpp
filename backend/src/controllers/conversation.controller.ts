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
    }).populate('participants', { username: 1, firstname: 1, lastname: 1 });
    if (existingConversation) {
      if (existingConversation.messages.length > 0) {
        console.log('messages: ', existingConversation.messages?.length);
        await existingConversation.populate({
          path: 'messages',
          options: { limit: 50, sort: { createdAt: -1 } },
        });
      }
      console.log(
        'Sent back existing conversation between: ',
        existingConversation.participants[0].firstname,
        ' and ',
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
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};
export const getConversations = async (req: Request | any, res: Response) => {
  console.log('hi');
  const { userId } = req;
  try {
    const _conversations = await Conversation.find({
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
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
