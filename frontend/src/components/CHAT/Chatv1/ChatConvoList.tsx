import React, { useEffect, useState, ChangeEvent } from 'react';
import ChatConvoListItem from './ChatConvoListItem';
import { Conversation } from '../../../types/chatTypes';
import UserAPI from '../../../utils/helper/apiHandlers/userApi';
import { ProfileInfo } from '../../../types/userTypes';
import localStorageKit from '../../../utils/helper/localstorageKit';
type Props = {
  profileData: ProfileInfo;
  socket: any;
  handleActiveConversation: (friendId: string) => Promise<void>;
  activeChat: boolean;
  activeRoom: string;
};
const formattedTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
console.log(formattedTimestamp('2024-04-28T19:59:25.446Z'));
const ChatConvoList: React.FC<Props> = ({
  profileData,
  socket,
  handleActiveConversation,
  activeChat,
  activeRoom,
}) => {
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [filteredConvos, setFilteredConvos] = useState<Conversation[]>([]);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [partakers, setPartakers] = useState<ProfileInfo[]>([]);
  useEffect(() => {
    const getConversationList = async () => {
      try {
        const response = await UserAPI.getUserConversations();
        if (response) {
          console.log('YOU GOT RESPONSE: ', response.data);
          setConversationList(
            localStorageKit.getNotificationList(response.data)
          );
          setFilteredConvos(localStorageKit.getNotificationList(response.data));
        }
      } catch (err: any) {
        console.log('ERROR getting conversations', err.message);
      }
    };
    getConversationList();
  }, [profileData]);

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setFilterQuery(e.target.value.toLowerCase());
    console.log(query);
    const filter = conversationList.filter((c) =>
      c.participants[1].firstname.toLowerCase().includes(query)
    );
    setFilteredConvos(filter);
  };
  // const updateFilterAtNotification = () => {
  //   console.log('CONVERSATIONLIST ', conversationList);
  //   setFilteredConvos(conversationList);
  // };
  // useEffect(() => {
  //   updateFilterAtNotification();
  // }, [conversationList]);
  useEffect(() => {
    console.log(filteredConvos);
  }, [filteredConvos]);

  useEffect(() => {
    mountNotificationSocket();
    return () => {
      unMountNotificationSocket();
    };
  }, [socket]);
  useEffect(() => {
    console.log('Room has changed: ', activeRoom);
  }, [activeRoom]);
  const handleNotification = (data: any) => {
    if (data.room && data.room !== activeRoom) {
      setConversationList((prevConversationList) => {
        const updatedConvoList = prevConversationList.map((c) => {
          if (data.room === c._id && c.active === true) {
            console.log(c._id);
            return { ...c, hasNewMessage: true };
          }
          return c;
        });
        return updatedConvoList;
      });

      setFilteredConvos((prevFilteredConvos) => {
        const updatedFilteredConvos = prevFilteredConvos.map((c) => {
          if (data.room === c._id && c.active === true) {
            localStorageKit.notificationStorage(c._id);
            return { ...c, hasNewMessage: true };
          }
          return c;
        });

        return updatedFilteredConvos;
      });
    }
  };
  const mountNotificationSocket = () => {
    socket.on('notification_message', handleNotification);
  };
  const unMountNotificationSocket = () => {
    socket.off('notification_message', handleNotification);
  };
  const resetNotification = (conversationId: string) => {
    setConversationList((prevConversationList) => {
      const updatedConvoList = prevConversationList.map((c) => {
        if (conversationId === c._id) {
          console.log(c._id);
          return { ...c, hasNewMessage: false };
        }
        return c;
      });
      return updatedConvoList;
    });
    setFilteredConvos((prevFilteredConvos) => {
      const updatedFilteredConvos = prevFilteredConvos.map((c) => {
        if (conversationId === c._id) {
          localStorageKit.removeNotification(c._id);
          return { ...c, hasNewMessage: false };
        }
        return c;
      });
      return updatedFilteredConvos;
    });
  };
  return (
    <>
      gdfbhd <label htmlFor="searchConvos-input">Search conversations</label>
      <input id={'searchConvos-input"'} onChange={handleFilter} />
      <div style={{ overflow: 'auto' }}>
        {filteredConvos &&
          profileData &&
          filteredConvos
            .sort((a, b) => {
              if (a.hasNewMessage && !b.hasNewMessage) {
                return -1;
              }
              if (!a.hasNewMessage && b.hasNewMessage) {
                return 1;
              }
              return 0;
            })
            .filter((c) => c._id !== activeRoom)
            .map((convo: Conversation, i) => {
              return (
                <ChatConvoListItem
                  key={'c-' + i}
                  {...{
                    convo,
                    handleActiveConversation,
                    profileData,
                    socket,
                    resetNotification,
                  }}
                />
              );
            })}
      </div>
    </>
  );
};

export default ChatConvoList;
