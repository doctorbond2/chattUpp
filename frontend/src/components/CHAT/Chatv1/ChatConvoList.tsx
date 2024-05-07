import React, { useEffect, useState, ChangeEvent } from 'react';
import ChatConvoListItem from './ChatConvoListItem';
import { Conversation } from '../../../types/chatTypes';
import UserAPI from '../../../utils/helper/apiHandlers/userApi';
import { ProfileInfo } from '../../../types/userTypes';
import localStorageKit from '../../../utils/helper/localstorageKit';
import { match } from 'assert';
type Props = {
  profileData: ProfileInfo;
  socket: any;
  handleActiveConversation: (friendId: string) => Promise<void>;
  activeChat: boolean;
  activeRoom: string;
};

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
  useEffect(() => {
    const getConversationList = async () => {
      try {
        const response = await UserAPI.getUserConversations();
        if (response) {
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
    const query = e.target.value.toLowerCase().trim();
    setFilterQuery(query);
    console.log(query);
    const queryWords = query.split(/\s+/);
    const filter = conversationList.filter((c) => {
      const fullName =
        `${c.participants[1]?.firstname} ${c.participants[1]?.lastname}`.toLowerCase();
      return queryWords.every(
        (word) =>
          fullName.includes(word) ||
          `${c.participants[0]?.firstname} ${c.participants[0]?.lastname}`
            .toLowerCase()
            .includes(word)
      );
    });

    setFilteredConvos(filter);
  };

  // const updateFilterAtNotification = () => {
  //   console.log('CONVERSATIONLIST ', conversationList);
  //   setFilteredConvos(conversationList);
  // };
  // useEffect(() => {
  //   updateFilterAtNotification();
  // }, [conversationList]);
  const handleActiveRooms = (data: any) => {
    console.warn(data, profileData.conversations);
    const roomList = localStorageKit.getRoomList();
    setConversationList((prevConversationList) => {
      const updatedConvoList = prevConversationList.map((c, i: number) => {
        const matchingRoom = roomList.find((r) => c._id === r.conversation);
        c.hasChatter = false;
        if (matchingRoom && !data.leaver) {
          if (matchingRoom.users.length > 0) {
            console.warn(i + 1);
            c.hasChatter = true;
          }
        }
        return c;
      });

      return updatedConvoList;
    });
    setFilteredConvos((prevFilteredConvos) => {
      const updatedFilteredConvos = prevFilteredConvos.map((c, i: number) => {
        const matchingRoom = roomList.find((r) => c._id === r.conversation);
        c.hasChatter = false;
        if (matchingRoom) {
          console.warn(matchingRoom, i);
          if (matchingRoom.users.length > 0) {
            c.hasChatter = true;
          }
        }
        return c;
      });
      return updatedFilteredConvos;
    });
  };
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on('join_room', handleActiveRooms);
    socket.on('leave_room', handleActiveRooms);
    return () => {
      socket.off('join_room', handleActiveRooms);
      socket.off('leave_room', handleActiveRooms);
    };
  }, [socket]);
  // useEffect(() => {}, [socket]);
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
    const inRoom = localStorageKit.checkIfInActiveRoom(
      data.room,
      profileData._id
    );
    if (data.room && !inRoom) {
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
      <label htmlFor="searchConvos-input">Search conversations</label>
      <input id={'searchConvos-input"'} onChange={handleFilter} />
      <div style={{ overflow: 'auto', height: '70vh' }}>
        {conversationList &&
          filteredConvos &&
          profileData &&
          filteredConvos
            .sort((a, b) => {
              if (a.hasNewMessage && !b.hasNewMessage) {
                return -1;
              }
              if (!a.hasNewMessage && b.hasNewMessage) {
                return 1;
              }
              if (a.hasChatter && !b.hasChatter) {
                return -1;
              }
              if (!a.hasChatter && b.hasChatter) {
                return 1;
              }
              return 0;
            })
            // .filter((c) => c._id !== activeRoom)
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
