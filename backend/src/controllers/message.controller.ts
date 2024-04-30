import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { Response, Request } from 'express';
export async function addNewMessageToConversationController(
  req: Request | any,
  res: Response
) {
  console.log('HELLO FROM THE MESSAGE CONTROLLER!');
  const { userId } = req;
  const { receivedBy, textContent } = req.body;
  console.log(userId, receivedBy, textContent);
  try {
    const _currentConversation = await Conversation.findOne({
      participants: { $all: [userId, receivedBy] },
    });
    if (_currentConversation) {
      console.log('Found the conversation np');
      const newMessage = new Message({
        textContent: textContent,
        sentBy: userId,
        receivedBy: receivedBy,
        conversation: _currentConversation._id,
      });
      await newMessage.save();
      return res.status(201).json({ message: 'Created!' });
    }
  } catch (err: any) {
    console.log('Something went wrong adding new message');
    console.log(err.message);
    return res.status(500);
  }
}
export async function deleteAllTheMessages(req: Request | any, res: Response) {
  try {
    await Message.find().deleteMany();
    res.status(204).send('');
  } catch (err: any) {
    console.log(err.message);
  }
}
