import React, { useEffect } from 'react';
import { Conversation } from '../../../types/chatTypes';
type Props = {
  convo: Conversation;
};

const ChatConvoListItem: React.FC<Props> = ({ convo }) => {
  return <>{convo.participants[0]}</>;
};

export default ChatConvoListItem;
