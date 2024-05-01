import React, { useEffect, useState } from 'react';
import ChatConvoListItem from './ChatConvoListItem';
import { Conversation } from '../../../types/chatTypes';
type Props = {
  conversations: Conversation[];
};
const formattedTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
console.log(formattedTimestamp('2024-04-28T19:59:25.446Z'));
const ChatConvoList: React.FC<Props> = ({ conversations }) => {
  useEffect(() => {
    console.log(conversations);
  }, []);

  return (
    <>
      {conversations.map((convo: Conversation, i) => {
        return <ChatConvoListItem key={'c-' + i} {...{ convo }} />;
      })}
    </>
  );
};

export default ChatConvoList;
