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
  const [activeConversation, setActiveConversation] = useState<Conversation>({
    participants: [],
    messages: [],
    _id: '',
  });
  const [activeFriendId, setActiveFriendId] = useState<string>('');
  //FUNCTIONS
  const sendMessage = async (message: Message) => {
    console.log('Sent message: ' + message + ' ' + 'To Room:' + room);
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
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
  const switchToConversation = async (friendId: string) => {
    if (room.length > 0) {
      leaveRoom();
      console.log('Left the current room');
    }
    try {
      const conversation: any = await convoAPI.verifyConversation(friendId);
      if (conversation.data) {
        const { data } = conversation;
        const { _id, messages, participants } = data;
        console.log('MEESSAAGEGESS: ', data);
        await joinRoom(_id);
        setActiveConversation(conversation.data);
        const sender = returnSender(participants, friendId);
        setSender(sender);
        if (messages && messages.length > 0 && participants && friendId) {
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
    setRoom(conversationId);
  };
  const leaveRoom = () => {
    if (room !== '') {
      socket.emit('leave_room', room);
      setRoom('');
    }
  };
  const handleMessage = (message: any) => {
    console.log('Incoming data: ', message);
    if (activeFriendId && activeConversation.participants && message) {
      const parsedMessage: Message = chatParser.parseOneMessage(
        message,
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
              <Col>{conversations && profileData && <ChatConvoList />}</Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Chatv2;
