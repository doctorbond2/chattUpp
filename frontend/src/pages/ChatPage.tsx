import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import ChatBox from '../components/CHAT/ChatBox';
import ChatInput from '../components/CHAT/ChatInput';
import ChatConvoList from '../components/CHAT/ChatConvoList';
import UserAPI from '../utils/helper/apiHandlers/userApi';
import ChatFriendList from '../components/CHAT/ChatFriendList';
import { defaultProfileInfo, ProfileInfo } from '../types/userTypes';
import { useChat } from '../utils/hooks/ChatContext';
import { useAuth } from '../utils/hooks/AuthContext';
type Props = {};
const socket: Socket = io(import.meta.env.VITE_ServerPort);
const ChatPage: React.FC<Props> = ({}) => {
  const { loggedIn } = useAuth();
  const { room, joinRoom, switchToConversation } = useChat();
  const navigate = useNavigate();
  const redirectOnNoUser = () => {
    navigate('/login');
  };

  const [conversations, setConversations] = useState([]);
  const [friends, setFriends] = useState([]);
  const [profileData, setProfileData] =
    useState<ProfileInfo>(defaultProfileInfo);

  const handleActiveConversation = async (friendId: string) => {
    console.log('You have targeted friend: ', friendId);
    if (friendId !== '') {
      await switchToConversation(friendId);
    }
  };
  // const handleActiveRoom = async (target: string) => {
  //   if (target !== room) {
  //     // joinRoom(target);
  //     // switchToConversation();
  //   }
  // };
  useEffect(() => {
    console.log('Current room: ', room);
  }, [room]);
  useEffect(() => {
    if (!loggedIn.access) {
      redirectOnNoUser();
      console.log('You probably need to login!');
      return;
    }
    const fetchProfileData = async () => {
      try {
        const response = await UserAPI.getUserDetails();
        if (response) {
          console.log('You got a response!', response);
          setProfileData(response.data);
          setConversations(response.data.conversations);
          setFriends(response.data.friends);
        }
      } catch (err: any) {
        console.log('ERROR BRUH', err.message);
        redirectOnNoUser();
      }
    };
    fetchProfileData();
  }, [loggedIn]);
  return (
    <>
      {profileData && loggedIn.access && (
        <>
          <Container>
            <Row>
              <Col>
                <h1>Room: {room}</h1>
                <ChatInput />
                <ChatBox />
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
                {conversations && profileData && (
                  <ChatConvoList {...{ conversations }} />
                )}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default ChatPage;
