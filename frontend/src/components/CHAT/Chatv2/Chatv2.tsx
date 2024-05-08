import React, { useState, useEffect } from 'react';
import { Message } from '../../../types/chatTypes';
import { Container, Col, Row } from 'react-bootstrap';
import convoAPI from '../../../utils/helper/apiHandlers/convoApi';
import localStorageKit from '../../../utils/helper/localstorageKit';
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
  const { loggedIn } = useAuth();
  const { room, setRoom } = useSocketV2();
  //STATES
  const [messages, setMessages] = useState<Message[]>([]);

  // const [messageReceived, setMessageReceived] = useState('');
  // const [sender, setSender] = useState<any>();
  const [senderMessage, setSenderMessage] = useState<any>(null);
  // const [conversations, setConversations] = useState<Conversation[]>([]);
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
      console.warn('friend id: ' + friendId);
      const conversation: any = await convoAPI.verifyConversation(friendId);
      if (conversation.data) {
        const { data } = conversation;
        console.log('DATA: ', data);
        const { _id, messages: databaseMessages, participants } = data;
        await joinRoom(_id);
        setRoom(_id);
        setActiveConversation(conversation.data);
        // setConversations(conversationData);
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
  useEffect(() => {
    console.error(room);
  }, [room]);
  const handleActiveConversation = async (friendId: string) => {
    if (friendId !== '') {
      await switchToConversation(friendId);
      setActiveFriendId(friendId);
    }
  };

  const joinRoom = async (conversationId: string) => {
    const joinRoomInfo = {
      room: conversationId,
      joiner: profileData._id,
    };
    socket.emit('join_room', joinRoomInfo);
  };
  const leaveRoom = () => {
    console.log('room: ', room);
    if (room !== '') {
      const leaverInfo = {
        room: room,
        leaver: profileData._id,
      };
      socket.emit('leave_room', leaverInfo);
      setRoom('');
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
  const handleRemovedAsFriend = (data: any) => {
    if (profileData.conversations) {
      const sharedConversation: any = profileData.conversations.find(
        (c: any) => {
          return c.participants.includes(data);
        }
      );
      if (sharedConversation) {
        const isActive = localStorageKit.checkIfInActiveRoom(
          sharedConversation._id,
          profileData._id
        );
        if (isActive) {
          alert('You were removed as friend.');
          window.location.reload();
        }
      }
    }
  };
  useEffect(() => {
    socket.on('remove_friend', handleRemovedAsFriend);
    return () => {
      socket.off('remove_friend', handleRemovedAsFriend);
    };
  }, [socket]);
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
          <Container
            style={{
              borderRight: '1px solid lightgray',
              borderLeft: '1px solid lightgray',
            }}
          >
            <Row>
              <Col>
                {' '}
                {friends && profileData && (
                  <ChatFriendList
                    {...{
                      profileData,
                      socket,
                    }}
                  />
                )}
              </Col>
              <Col>
                {activeFriendId && activeConversation && room && (
                  <ChatBox
                    {...{
                      profileData,
                      messages,
                      onMount,
                      offMount,
                      socket,
                    }}
                  />
                )}
                {room && activeFriendId && (
                  <ChatInput {...{ activeFriendId, sendMessage, leaveRoom }} />
                )}
              </Col>

              <Col>
                {profileData && messages && (
                  <ChatConvoList
                    {...{
                      profileData,
                      socket,
                      handleActiveConversation,
                      leaveRoom,
                    }}
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
