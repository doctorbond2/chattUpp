import React, { useState } from 'react';
import { Message } from '../../../types/chatTypes';
import { Button } from 'react-bootstrap';
type Props = {
  activeFriendId: string;
  sendMessage: (message: Message) => void;
  leaveRoom: () => void;
};

const ChatInput: React.FC<Props> = ({
  activeFriendId,
  sendMessage,
  leaveRoom,
}) => {
  const [messageText, setMessageText] = useState('');
  const handleSetMessageText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };
  return (
    <>
      <input value={messageText} onChange={handleSetMessageText} />
      <Button
        style={{
          backgroundColor: 'lightblue',
          color: 'black',
          fontFamily: 'Arial',
        }}
        onClick={async () => {
          sendMessage({
            textContent: messageText,
            receivedBy: activeFriendId,
          });
        }}
      >
        Send message
      </Button>
      <Button
        onClick={leaveRoom}
        style={{ backgroundColor: 'red', color: 'black', fontFamily: 'Arial' }}
      >
        Leave room
      </Button>
    </>
  );
};

export default ChatInput;
