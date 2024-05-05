import { Message } from '../../types/chatTypes';
import { ProfileInfo } from '../../types/userTypes';

class ParseKit {
  constructor() {}
  parseChatMessages(
    messages: Message[],
    participants: ProfileInfo[],
    friendId: string
  ) {
    const c: any[] = participants;
    const parsedMessages = messages
      .map((m, i: number) => {
        let parsedMessage: Message = { ...m };
        if (friendId !== c[0]) {
          parsedMessage.sentBy = c[0].firstname;
          parsedMessage.receivedBy = c[1].firstname;
        } else {
          parsedMessage.sentBy = c[1].firstname;
          parsedMessage.receivedBy = c[0].firstname;
        }
        return parsedMessage;
      })
      .reverse();
    return parsedMessages;
  }
  parseOneMessage(
    message: Message,
    participants: ProfileInfo[],
    friendId: string
  ) {
    const c: any[] = participants;
    let parsedMessage: Message = { ...message };
    if (friendId !== c[0]) {
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
