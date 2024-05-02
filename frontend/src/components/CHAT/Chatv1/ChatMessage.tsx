import React from 'react';
import { Message } from '../../../types/chatTypes';
import { ProfileInfo } from '../../../types/userTypes';
import { Card } from 'react-bootstrap';
type Props = {
  message: Message;
  profileData: ProfileInfo;
};

const ChatMessage: React.FC<Props> = ({ message, profileData }) => {
  return (
    <>
      <Card>
        <p>{message.textContent}</p>
        <p>From: {message.sentBy}</p>
        <p>To: {message.receivedBy}</p>
      </Card>
    </>
  );
};

export default ChatMessage;
