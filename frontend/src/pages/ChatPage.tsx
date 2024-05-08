import React, { useState, useEffect } from 'react';
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
      {profileData &&
        loggedIn.access &&
        socket &&
        conversations &&
        profileData._id && <Chatv2 {...{ profileData, friends, socket }} />}
    </>
  );
};

export default ChatPage;
