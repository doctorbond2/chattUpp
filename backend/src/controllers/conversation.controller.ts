import Conversation from '../models/conversation.model.js';
import { Response, Request } from 'express';

export const createNewConvoController = async (req: Request, res: Response) => {
  try {
    const _conversation = new Conversation(req.body);
    await _conversation.save();
    res.status(200).send('Created new conversation');
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
