import React, { useEffect, useState, ChangeEvent } from 'react';
import ChatConvoListItem from './ChatConvoListItem';
import { Conversation } from '../../../types/chatTypes';
import UserAPI from '../../../utils/helper/apiHandlers/userApi';
import { ProfileInfo } from '../../../types/userTypes';
type Props = {};
const formattedTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
console.log(formattedTimestamp('2024-04-28T19:59:25.446Z'));
const ChatConvoList: React.FC<Props> = ({}) => {
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [filteredConvos, setFilteredConvos] = useState<Conversation[]>([]);
  const [partakers, setPartakers] = useState<ProfileInfo[]>([]);
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
    console.log(filterQuery);
    const query = e.target.value.toLowerCase();
    setFilterQuery(query);
    const filter = conversationList.filter((c: Conversation) => {
      const participants = c.participants;
      if (participants && participants.length >= 2) {
        return participants[0].firstname.toLowerCase().includes(query);
      }
      return false;
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
      <input
        id={'searchConvos-input"'}
        onChange={handleFilter}
        value={filterQuery}
      />
      {filteredConvos &&
        conversationList &&
        filteredConvos.map((convo: Conversation, i) => {
          return <ChatConvoListItem key={'c-' + i} {...{ convo }} />;
        })}
    </>
  );
};

export default ChatConvoList;
