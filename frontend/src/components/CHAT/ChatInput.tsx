import React, { useState } from 'react';
import { useChat } from '../../utils/hooks/ChatContext';
type Props = {
  activeFriendId: string;
};

const ChatInput: React.FC<Props> = ({ activeFriendId }) => {
  const { sendMessage } = useChat();
  const [messageText, setMessageText] = useState('');
  const handleSetMessageText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };
  return (
    <>
      <input value={messageText} onChange={handleSetMessageText} />
      <button
        onClick={() => {
          sendMessage({ textContent: messageText, receivedBy: activeFriendId });
        }}
      ></button>
    </>
  );
};

export default ChatInput;
