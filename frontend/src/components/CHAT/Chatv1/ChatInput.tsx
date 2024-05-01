import React, { useState } from 'react';
import { Message } from '../../../types/chatTypes';
type Props = {
  activeFriendId: string;
  sendMessage: (message: Message) => void;
};

const ChatInput: React.FC<Props> = ({ activeFriendId, sendMessage }) => {
  const [messageText, setMessageText] = useState('');
  const handleSetMessageText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };
  return (
    <>
      <input value={messageText} onChange={handleSetMessageText} />
      <button
        onClick={async () => {
          await sendMessage({
            textContent: messageText,
            receivedBy: activeFriendId,
          });
        }}
      >
        Send message
      </button>
      <button
        onClick={() => {
          sendMessage({
            textContent: messageText,
            receivedBy: activeFriendId,
          });
        }}
      >
        testSend
      </button>
    </>
  );
};

export default ChatInput;
