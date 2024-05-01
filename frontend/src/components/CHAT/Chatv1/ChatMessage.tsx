import React from 'react';
import { Message } from '../../../types/chatTypes';
import { ProfileInfo } from '../../../types/userTypes';
type Props = {
  message: Message;
  profileData: ProfileInfo;
};

const ChatMessage: React.FC<Props> = ({ message, profileData }) => {
  return (
    <>
      <div>
        <p>{message.textContent}</p>
        <p>Sent by: {message.sentBy}</p>
        <p>Received by: {message.receivedBy}</p>
      </div>
    </>
  );
};

export default ChatMessage;
