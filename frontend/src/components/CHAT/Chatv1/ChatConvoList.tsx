import React, { useEffect, useState, ChangeEvent } from 'react';
import ChatConvoListItem from './ChatConvoListItem';
import { Conversation } from '../../../types/chatTypes';
import UserAPI from '../../../utils/helper/apiHandlers/userApi';
import { ProfileInfo } from '../../../types/userTypes';
import localStorageKit from '../../../utils/helper/localstorageKit';
import { useSocketV2 } from '../../../utils/hooks/SocketContextV2';
type Props = {
  profileData: ProfileInfo;
  socket: any;
  handleActiveConversation: (friendId: string) => Promise<void>;
  leaveRoom: () => void;
};

const ChatConvoList: React.FC<Props> = ({
  profileData,
  socket,
  handleActiveConversation,
  leaveRoom,
}) => {
  const [activeRoom, setActiveRoom] = useState<string>('');
  const { room } = useSocketV2();
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [filteredConvos, setFilteredConvos] = useState<Conversation[]>([]);
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
  }, [profileData, room]);
  const getConversationList = async () => {
    try {
      const response = await UserAPI.getUserConversations();
      if (response) {
        setConversationList(localStorageKit.getNotificationList(response.data));
        setFilteredConvos(localStorageKit.getNotificationList(response.data));
      }
    } catch (err: any) {
      console.log('ERROR getting conversations', err.message);
    }
  };
  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase().trim();
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
      const updatedConvoList = prevConversationList.map((c) => {
        const matchingRoom = roomList.find((r) => c._id === r.conversation);
        c.hasChatter = false;
        if (matchingRoom && !data.leaver) {
          if (matchingRoom.users.length > 0) {
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
  const handleNewConversation = () => {
    getConversationList();
  };
  const handleNotification = (data: any) => {
    const inRoom = localStorageKit.checkIfInActiveRoom(
      data.room,
      profileData._id
    );
    if (data.room && !inRoom) {
      setConversationList((prevConversationList) => {
        const updatedConvoList = prevConversationList.map((c) => {
          if (data.room === c._id && c.active === true) {
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
  const handleDeleteConversation = (data: any) => {
    const isActive = localStorageKit.checkIfInActiveRoom(data, profileData._id);
    if (isActive) {
      alert('This conversation has been deleted.');
      leaveRoom();
      window.location.reload();
    }
    getConversationList();
  };
  const handleRemoveFriend = (data: any) => {
    setConversationList((prevConversationList) => {
      const updatedConvoList = prevConversationList.map((c) => {
        console.warn(c.participants);
        console.warn(data);
        if (c.participants.find((p) => p._id === data)) {
          console.log('test 1');
          return {
            ...c,
            active: false,
            hasNewMessage: false,
            hasChatter: false,
          };
        }
        return c;
      });
      return updatedConvoList;
    });
    setFilteredConvos((prevFilteredConvos) => {
      const updatedFilteredConvos = prevFilteredConvos.map((c) => {
        if (c.participants.find((p) => p._id === data)) {
          return {
            ...c,
            active: false,
            hasNewMessage: false,
            hasChatter: false,
          };
        }
        return c;
      });
      return updatedFilteredConvos;
    });
  };
  const handleAddFriend = (data: any) => {
    setConversationList((prevConversationList) => {
      const updatedConvoList = prevConversationList.map((c) => {
        if (c.participants.find((p) => p._id === data)) {
          console.log('test 1');
          return { ...c, active: true };
        }
        return c;
      });
      return updatedConvoList;
    });
    setFilteredConvos((prevFilteredConvos) => {
      const updatedFilteredConvos = prevFilteredConvos.map((c) => {
        if (c.participants.find((p) => p._id === data)) {
          return { ...c, active: true };
        }
        return c;
      });
      return updatedFilteredConvos;
    });
  };
  const activateConversation = (data: any) => {
    setConversationList((prevConversationList) => {
      const updatedConvoList = prevConversationList.map((c) => {
        if (c._id === data.room) {
          return { ...c, chatActive: true };
        }
        return c;
      });
      return updatedConvoList;
    });
    setFilteredConvos((prevFilteredConvos) => {
      const updatedFilteredConvos = prevFilteredConvos.map((c) => {
        if (c._id === data.room) {
          return { ...c, chatActive: true };
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
    socket.on('add_friend', handleAddFriend);
    socket.on('remove_friend', handleRemoveFriend);
    socket.on('join_room', handleActiveRooms);
    socket.on('leave_room', handleActiveRooms);
    socket.on('new_conversation', handleNewConversation);
    socket.on('delete_conversation', handleDeleteConversation);
    socket.on('notification_message', activateConversation);
    return () => {
      socket.off('add_friend', handleAddFriend);
      socket.off('remove_friend', handleRemoveFriend);
      socket.off('join_room', handleActiveRooms);
      socket.off('leave_room', handleActiveRooms);
      socket.off('new_conversation', handleNewConversation);
      socket.off('delete_conversation', handleDeleteConversation);
      socket.off('notification_message', activateConversation);
    };
  }, [socket]);
  useEffect(() => {
    mountNotificationSocket();
    return () => {
      unMountNotificationSocket();
    };
  }, [socket]);
  useEffect(() => {
    setActiveRoom(room);
  }, [room]);
  useEffect(() => {
    console.log('Room has changed: ', activeRoom);
  }, [activeRoom]);

  return (
    <>
      {conversationList.length > 0 ? (
        <>
          <label htmlFor="searchConvos-input" style={{ fontFamily: 'Arial' }}>
            Search conversations
          </label>
          <input id={'searchConvos-input"'} onChange={handleFilter} />
        </>
      ) : (
        <h3 style={{ marginRight: ' 20vw', marginTop: '20vh' }}>
          Welcome! Why not start some new conversations?
        </h3>
      )}

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
              if (a.chatActive && !b.chatActive) {
                return -1;
              }
              if (!a.chatActive && b.chatActive) {
                return 1;
              }
              if (a.active && !b.active) {
                return -1;
              }
              if (!a.active && b.active) {
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
                    resetNotification,
                    socket,
                  }}
                />
              );
            })}
      </div>
    </>
  );
};

export default ChatConvoList;
