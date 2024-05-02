import React, { useEffect, useState, ChangeEvent } from 'react';
import ChatConvoListItem from './ChatConvoListItem';
import { Conversation } from '../../../types/chatTypes';
import UserAPI from '../../../utils/helper/apiHandlers/userApi';
import { ProfileInfo } from '../../../types/userTypes';
type Props = { profileData: ProfileInfo };
const formattedTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
console.log(formattedTimestamp('2024-04-28T19:59:25.446Z'));
const ChatConvoList: React.FC<Props> = ({ profileData }) => {
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [filteredConvos, setFilteredConvos] = useState<Conversation[]>([]);
  const [partakers, setPartakers] = useState<ProfileInfo[]>([]);
  useEffect(() => {
    console.log('USED EFFECT!');
    const getConversationList = async () => {
      try {
        const response = await UserAPI.getUserConversations();
        if (response) {
          console.log('YOU GOT RESPONSE: ', response.data);
          setConversationList(response.data);
          setFilteredConvos(response.data);
        }
      } catch (err: any) {
        console.log('ERROR getting conversations', err.message);
      }
    };
    getConversationList();
  }, [profileData]);
  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    console.log(query);
    const filter = conversationList.filter((c) =>
      c.participants[1].firstname.toLowerCase().includes(query)
    );
    setFilteredConvos(filter);
  };
  useEffect(() => {
    console.log(filteredConvos);
  }, [filteredConvos]);
  return (
    <>
      <label htmlFor="searchConvos-input">Search conversations</label>
      <input id={'searchConvos-input"'} onChange={handleFilter} />
      <div>
        {filteredConvos &&
          filteredConvos.map((convo: Conversation, i) => {
            return <ChatConvoListItem key={'c-' + i} {...{ convo }} />;
          })}
      </div>
    </>
  );
};

export default ChatConvoList;
