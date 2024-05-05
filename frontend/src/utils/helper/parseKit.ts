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
    console.log('Participants: ', c);
    const parsedMessages = messages.map((m: Message, i: number) => {
      let parsedMessage: Message = { ...m };
      console.log('FriendId: ', friendId);
      if (friendId !== m.sentBy) {
        console.log('You sent this message');
        parsedMessage.sentBy = c[0];
        parsedMessage.receivedBy = c[1];
      } else {
        console.log('Friend sent this message');
        parsedMessage.sentBy = c[1];
        parsedMessage.receivedBy = c[0];
      }
      console.log('m sentby: ', m.sentBy);
      console.log(i, ' ');
      console.log(
        i,
        ' ',
        'sentby: ',
        parsedMessage.sentBy.firstname,
        'receivedby',
        parsedMessage.receivedBy.firstname
      );
      return parsedMessage;
    });

    return parsedMessages;
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
