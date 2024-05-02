import React, { useEffect, useState, ChangeEvent } from 'react';
import ChatConvoListItem from './ChatConvoListItem';
import { Conversation } from '../../../types/chatTypes';
import UserAPI from '../../../utils/helper/apiHandlers/userApi';
type Props = {};
const formattedTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
console.log(formattedTimestamp('2024-04-28T19:59:25.446Z'));
const ChatConvoList: React.FC<Props> = ({}) => {
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [filteredConvos, setFilteredConvos] = useState<Conversation[]>([]);
  const [filterQuery, setFilterQuery] = useState<string>('');
  useEffect(() => {
    const getConversationList = async () => {
      try {
        const response = await UserAPI.getUserConversations();
        if (response) {
          console.log('YOU GOT RESPONSE: ', response.data);
          setConversationList(response.data);
          setFilteredConvos(conversationList);
        }
      } catch (err: any) {
        console.log('ERROR getting conversations', err.message);
      }
    };
    getConversationList();
  }, []);
  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setFilterQuery(query);
    const filter = conversationList.filter((c: Conversation, i: number) => {
      console.log(c.participants[1]);
      return c.participants[1].firstname.toLowerCase().includes(query);
    });
    console.log(filter);
    if (query === '') {
      setFilteredConvos(conversationList);
    } else {
      setFilteredConvos(filter);
    }
  };
  return (
    <>
      <label htmlFor="searchConvos-input">Search conversations</label>
      <input id={'searchConvos-input"'} onChange={handleFilter} />
      {filteredConvos &&
        conversationList &&
        filteredConvos.map((convo: Conversation, i) => {
          return <ChatConvoListItem key={'c-' + i} {...{ convo }} />;
        })}
    </>
  );
};

export default ChatConvoList;
