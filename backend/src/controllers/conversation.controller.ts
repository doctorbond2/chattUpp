import Conversation from '../models/conversation.model.js';
import User from '../models/user.model.js';
import { Response, Request } from 'express';
import Message from '../models/message.model.js';
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
        active: true,
      });
      const _you = await User.findById(userId);
      const _they = await User.findById(friendId);
      if (_you && _they) {
        _you.conversations.push(newConversation._id);
        _they.conversations.push(newConversation._id);
        await _you.save();
        await _they.save();
      }
      await newConversation.save();
      console.log('Created a new conversation');
      return res.status(201).json(newConversation);
    }
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};
export const activateConversation = async (
  req: Request | any,
  res: Response
) => {
  const { userId } = req;
  const { friendId } = req.body;
  console.log('Test: ', userId, friendId);
  try {
    const existingConversation: any = await Conversation.findOne({
      participants: { $all: [userId, friendId] },
    });
    console.log(existingConversation);
    if (existingConversation) {
      existingConversation.active = true;
      console.log(
        'Activating conversation between: ',
        existingConversation.participants[0].firstname,
        ' and ',
        existingConversation.participants[1].firstname
      );
      await existingConversation.save();
      return res.status(200).json(existingConversation);
    } else {
      return res.status(204).send('No conversation found.');
    }
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};
export const deactivateConversation = async (
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
      existingConversation.active = false;
      console.log(
        'Deactivating conversation between: ',
        existingConversation.participants[0].firstname,
        ' and ',
        existingConversation.participants[1].firstname
      );
      await existingConversation.save();
      return res.status(200).json(existingConversation);
    } else {
      return res.status(204).send('No conversation found.');
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
    let conversationsResponse = [];
    const active_conversations = await Conversation.find({
      participants: userId,
      active: true,
    })
      .populate('participants', {
        firstname: 1,
        lastname: 1,
        avatar: 1,
        username: 1,
        updatedAt: 1,
      })
      .sort({ updatedAt: -1 });
    const nonActive_conversations =
      (await Conversation.find({
        participants: userId,
        active: false,
      })
        .populate('participants', {
          firstname: 1,
          lastname: 1,
          avatar: 1,
          username: 1,
          updatedAt: 1,
        })
        .sort({ updatedAt: 1 })) || [];

    if (active_conversations.length > 0 || nonActive_conversations.length > 0) {
      conversationsResponse = [
        ...active_conversations,
        ...nonActive_conversations,
      ];
      return res.status(200).json(conversationsResponse);
    }
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
export const deleteConversation = async (req: Request | any, res: Response) => {
  if (!req.params.id) {
    res.status(404).send('no id');
  }
  const { id } = req.params;
  try {
    await Message.deleteMany({ conversation: id });
    await Conversation.deleteOne({ _id: id });
    console.log('Deleted');
    res.status(204).send('');
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json('');
  }
};
export const deleteConvoAndMessages = async (
  req: Request | any,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(404).json({ error: 'ID not found.' });
  }
  const { userId } = req;
  const { id } = req.params;
  try {
    const existingConversation: any = await Conversation.findOne({
      participants: { $all: [userId, id] },
    });
    console.log('EXISTING: ', existingConversation);
    await Message.deleteMany({ conversation: existingConversation._id });
    await Conversation.deleteOne({ _id: existingConversation._id });
    console.log('Deleted');
    res.status(204).send('');
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json('');
  }
};
export const getOneConversation = async (req: Request | any, res: Response) => {
  if (!req.params.id) {
    return res.status(404).json({ error: 'ID not found.' });
  }

  const { id } = req.params;

  try {
    const existingConversation: any = await Conversation.findById(id);
    if (existingConversation) {
      res.status(200).json(existingConversation);
    }
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json('');
  }
};
