import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAPI from '../utils/helper/apiHandlers/userApi';
import { useAuth } from '../utils/hooks/AuthContext';
import Chatv2 from '../components/CHAT/Chatv2/Chatv2';
import { useSocketV2 } from '../utils/hooks/SocketContextV2';
type Props = {};
const ChatPage: React.FC<Props> = ({}) => {
  const { loggedIn, profileData } = useAuth();
  const navigate = useNavigate();
  const redirectOnNoUser = () => {
    navigate('/login');
  };
  const { socket } = useSocketV2();
  const [friends, setFriends] = useState([]);
  const [conversations, setConversations] = useState([]);
  // const [socket, setSocket] = useState<any>(null);

  // useEffect(() => {
  //   const newSocket: Socket = io(import.meta.env.VITE_ServerPort);

  //   newSocket.on('connect', () => {
  //     console.log('Connected to server');
  //   });

  //   newSocket.on('disconnect', () => {
  //     console.log('Disconnected from server');
  //   });

  //   newSocket.on('error', (error: any) => {
  //     console.error('Socket error:', error);
  //   });
  //   setSocket(newSocket);

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);
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
      {profileData && loggedIn.access && socket && conversations && (
        <Chatv2 {...{ profileData, friends, conversations, socket }} />
      )}
    </>
  );
};

export default ChatPage;
