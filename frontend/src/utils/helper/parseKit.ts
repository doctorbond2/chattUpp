import { Message } from '../../types/chatTypes';
import { ProfileInfo } from '../../types/userTypes';

class ParseKit {
  constructor() {}
  parseChatMessages(
    messages: Message[],
    participants: ProfileInfo[],
    friendId: string
  ) {
    const p: any[] = participants;
    const you = p.find((item) => item._id !== friendId);
    const parsedMessages = messages.map((m: Message, i: number) => {
      let parsedMessage: Message = { ...m };

      if (m.sentBy === friendId) {
        parsedMessage.sentBy = friendId;
        parsedMessage.receivedBy = you;
      } else {
        parsedMessage.sentBy = you;
        parsedMessage.receivedBy = friendId;
      }

      return parsedMessage;
    });

    return parsedMessages.reverse();
  }
  parseOneMessage(
    message: Message,
    participants: ProfileInfo[],
    friendId: string
  ) {
    const c: any[] = participants;
    let parsedMessage: Message = { ...message };
    if (friendId !== c[0]._id) {
      parsedMessage.sentBy = c[0].firstname;
      parsedMessage.receivedBy = c[1].firstname;
    } else {
      parsedMessage.sentBy = c[1].firstname;
      parsedMessage.receivedBy = c[0].firstname;
    }
    return parsedMessage;
  }
}
const chatParser = new ParseKit();
export default chatParser;
