import React, { useState, ReactNode, useEffect } from 'react';
import { Message } from '../../../types/chatTypes';
import { io, Socket } from 'socket.io-client';
import { Container, Col, Row } from 'react-bootstrap';
import convoAPI from '../../../utils/helper/apiHandlers/convoApi';

import { Conversation } from '../../../types/chatTypes';
import { ProfileInfo } from '../../../types/userTypes';
import chatParserw from '../../../utils/helper/parseKit';
import ChatInput from '../Chatv1/ChatInput';
import { useAuth } from '../../../utils/hooks/AuthContext';
import ChatBox from '../Chatv1/ChatBox';
import ChatConvoList from '../Chatv1/ChatConvoList';
import ChatFriendList from '../Chatv1/ChatFriendList';
import chatParser from '../../../utils/helper/parseKit';
type Props = {
  profileData: ProfileInfo;
  friends: any;
  conversations: Conversation[];
  socket: any;
};

const Chatv2: React.FC<Props> = ({
  profileData,
  friends,
  conversations,
  socket,
}) => {
  const { loggedIn } = useAuth();
  socket.on('connect', () => {
    console.log('Socket connected');
  });

  //STATES
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const [sender, setSender] = useState<any>();
  const [activeChat, setActiveChat] = useState(false);
  const [userInChat, setUserInChat] = useState(false);
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
        sentBy: sender,
        conversation: activeConversation._id,
      };
      socket.emit('send_message', { message: newChatMessage, room });
      await convoAPI.addNewMessage(message);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const switchToConversation = async (friendId: string) => {
    if (room.length > 0) {
      leaveRoom();
    }
    try {
      const conversation: any = await convoAPI.verifyConversation(friendId);
      if (conversation.data) {
        const { data } = conversation;
        const { _id, messages, participants } = data;
        await joinRoom(_id);
        setActiveConversation(conversation.data);
        const sender = returnSender(participants, friendId);
        setSender(sender);
        if (messages && messages.length >= 0 && participants && friendId) {
          const parsedMessages: Message[] = chatParser.parseChatMessages(
            messages,
            participants,
            friendId
          );
          console.log('PARSED MESSAGES: ', parsedMessages);
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
  const returnSender = (both: string[], friend: string) => {
    const you: any = both.find((you) => you !== friend);
    if (you) {
      return you._id;
    }
  };
  const joinRoom = async (conversationId: string) => {
    socket.emit('join_room', conversationId);
    console.log('Joined Room: ', conversationId);
    console.log(socket);
    setRoom(conversationId);
    setUserInChat(true);
  };
  const leaveRoom = () => {
    if (room !== '') {
      socket.emit('leave_room', room);
      console.log(socket);
      setRoom('');
      setUserInChat(false);
    }
  };
  const handleMessage = (data: any) => {
    console.log('Incoming data: ', data);
    if (activeFriendId && activeConversation.participants && data.message) {
      const parsedMessage: Message = chatParser.parseOneMessage(
        data.message,
        activeConversation.participants,
        activeFriendId
      );
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

  useEffect(() => {
    console.log('Current room: ', room);
    return () => {
      console.log('Current room: ', room);
      if (activeChat && room !== '') {
        leaveRoom();
      }
    };
  }, []);

  return (
    <>
      {profileData && loggedIn.access && (
        <>
          <Container>
            <Row>
              <Col>
                <h1>Room: {room}</h1>
                {activeFriendId && messages && activeConversation && (
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
                {activeFriendId && (
                  <ChatInput {...{ activeFriendId, sendMessage }} />
                )}
              </Col>
              <Col>
                {' '}
                {friends && (
                  <ChatFriendList
                    {...{ friends, handleActiveConversation, profileData }}
                  />
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
