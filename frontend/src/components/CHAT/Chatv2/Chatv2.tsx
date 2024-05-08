import React, { useState, useEffect } from 'react';
import { Message } from '../../../types/chatTypes';
import { Container, Col, Row } from 'react-bootstrap';
import convoAPI from '../../../utils/helper/apiHandlers/convoApi';
import localStorageKit from '../../../utils/helper/localstorageKit';
import UserAPI from '../../../utils/helper/apiHandlers/userApi';
import { Conversation } from '../../../types/chatTypes';
import { ProfileInfo } from '../../../types/userTypes';
import ChatInput from '../Chatv1/ChatInput';
import { useAuth } from '../../../utils/hooks/AuthContext';
import ChatBox from '../Chatv1/ChatBox';
import ChatConvoList from '../Chatv1/ChatConvoList';
import ChatFriendList from '../Chatv1/ChatFriendList';
import chatParser from '../../../utils/helper/parseKit';
import { useSocketV2 } from '../../../utils/hooks/SocketContextV2';
type Props = {
  profileData: ProfileInfo;
  friends: any;
  // conversations: Conversation[];
  socket: any;
};

const Chatv2: React.FC<Props> = ({ profileData, friends, socket }) => {
  const { loggedIn, setProfileData } = useAuth();
  const { room, setRoom } = useSocketV2();
  //STATES
  const [messages, setMessages] = useState<Message[]>([]);

  // const [messageReceived, setMessageReceived] = useState('');
  // const [sender, setSender] = useState<any>();
  const [activeChat, setActiveChat] = useState(false);
  const [userInChat, setUserInChat] = useState(false);
  const [activeRooms, setActiveRooms] = useState<Conversation[]>([]);
  const [senderMessage, setSenderMessage] = useState<any>(null);
  const [activeConversation, setActiveConversation] = useState<Conversation>({
    participants: [],
    messages: [],
    _id: '',
  });
  const [activeFriendId, setActiveFriendId] = useState<string>('');
  //FUNCTIONS
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
  const sendMessage = async (message: Message) => {
    try {
      const newChatMessage: Message = {
        ...message,
        sentBy: senderMessage.sentBy,
        receivedBy: senderMessage.receivedBy,
        conversation: activeConversation._id,
      };
      socket.emit('send_message', { message: newChatMessage, room });
      await convoAPI.addNewMessage(message);
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const switchToConversation = async (friendId: string) => {
    if (room.length > 0 && room !== '') {
      leaveRoom();
    }
    try {
      const conversation: any = await convoAPI.verifyConversation(friendId);
      if (conversation.data) {
        const { data } = conversation;
        const { _id, messages: databaseMessages, participants } = data;
        joinRoom(_id);
        console.warn('ROOM', room);
        setActiveConversation(conversation.data);
        setSenderMessage(() => {
          let object = {};
          if (friendId === participants[0]._id) {
            object = {
              sentBy: participants[1],
              receivedBy: participants[0],
            };
          } else {
            object = {
              sentBy: participants[0],
              receivedBy: participants[1],
            };
          }
          return object;
        });
        if (
          databaseMessages &&
          databaseMessages.length >= 0 &&
          participants &&
          friendId
        ) {
          const parsedMessages: Message[] = chatParser.parseChatMessages(
            databaseMessages,
            participants,
            friendId
          );
          setMessages(parsedMessages);
        }
      }
    } catch (err: any) {
      console.log('Error caught! ', err.message);
    }
  };
  const handleActiveConversation = async (friendId: string) => {
    if (friendId !== '') {
      await switchToConversation(friendId);
      setActiveFriendId(friendId);
    }
  };
  // const returnSender = (both: string[], friend: string) => {
  //   const you: any = both.find((you) => you !== friend);
  //   if (you) {
  //     return you.firstname;
  //   }
  // };

  const joinRoom = async (conversationId: string) => {
    const joinRoomInfo = {
      room: conversationId,
      joiner: profileData._id,
    };
    socket.emit('join_room', joinRoomInfo);
    setRoom(conversationId);
  };
  const leaveRoom = () => {
    if (room !== '') {
      const leaverInfo = {
        room: room,
        leaver: profileData._id,
      };
      socket.emit('leave_room', leaverInfo);
      setRoom('');
      setUserInChat(false);
    }
  };
  const handleMessage = (data: any) => {
    console.log('Incoming data: ', data);
    if (activeFriendId && activeConversation.participants && data) {
      // const parsedMessage: Message = chatParser.parseOneMessage(
      //   data,
      //   activeConversation.participants,
      //   activeFriendId
      // );
      // console.log('PARSED MESSAGE: ', parsedMessage);
      const parsedMessage = data;
      setMessages((prev) => [...prev, parsedMessage]);
    } else {
      console.log('Something went wrong with updating chat.');
    }
  };
  const onMount = () => {
    socket.on('receive_message', handleMessage);
  };
  const offMount = () => {
    socket.off('receive_message', handleMessage);
  };
  // const returnToRoom = async (conversationId: string) => {
  //   try {
  //     const conversation = await convoAPI.getConversation(conversationId);
  //     if (conversation) {
  //       const { data } = conversation;
  //       console.warn(data);
  //       const { participants } = data;
  //       const friendId = participants.filter(
  //         (p: string) => p !== profileData._id
  //       );
  //       await switchToConversation(friendId);
  //     }
  //   } catch (err: any) {
  //     console.error(err.message);
  //   }
  // };
  useEffect(() => {
    localStorageKit.clearUserFromRoomListOnRefresh(profileData._id);
    return () => {
      console.log('Current room: ', room);
      if (room !== '') {
        leaveRoom();
      }
    };
  }, []);
  // useEffect(() => {
  //   const roomList = localStorageKit.getRoomList();
  //   let room_id = '';
  //   roomList.forEach((r) => {
  //     if (r.users.includes(profileData._id)) {
  //       room_id = r.conversation;
  //     }
  //   });
  //   if (room_id !== '' && room_id) {
  //     console.warn('RETURNING TO ROOM');
  //     returnToRoom(room_id);
  //   }
  // }, []);
  // Kolla om man är vän annars uppdatera inte localstorage

  return (
    <>
      {profileData && loggedIn.access && (
        <>
          <Container>
            <Row>
              <Col>
                {' '}
                {friends && profileData && (
                  <ChatFriendList
                    {...{
                      friends,
                      handleActiveConversation,
                      profileData,
                    }}
                  />
                )}
              </Col>
              <Col>
                <h1>{room && 'Room:' + room}</h1>
                {activeFriendId && activeConversation && room && (
                  <ChatBox
                    {...{
                      profileData,
                      messages,
                      onMount,
                      offMount,
                      room,
                      socket,
                    }}
                  />
                )}
                {room && activeFriendId && (
                  <ChatInput {...{ activeFriendId, sendMessage, leaveRoom }} />
                )}
              </Col>

              <Col>
                {profileData && (
                  <ChatConvoList
                    {...{
                      profileData,
                      socket,
                      handleActiveConversation,
                      activeChat,
                    }}
                    activeRoom={room}
                  />
                )}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Chatv2;
