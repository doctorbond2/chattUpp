import React, { useState, useEffect } from 'react';
import { ActiveUser } from '../types/userTypes';
import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../components/CHAT/ChatBox';
import { useAuth } from '../utils/hooks/AuthContext';
type Props = {};
const socket: Socket = io(import.meta.env.VITE_ServerPort);

const ChatPage: React.FC<Props> = ({}) => {
  const { loggedIn } = useAuth();
  console.log('LOGGED IN: ', loggedIn);
  const navigate = useNavigate();
  const redirectOnNoUser = () => {
    navigate('/login');
  };
  const [room, setRoom] = useState('');
  const switchSocketRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };
  useEffect(() => {
    if (!loggedIn.access) {
      redirectOnNoUser();
      console.log('You probably need to login!');
    }
  }, [loggedIn]);
  return (
    <>
      <ChatBox />
    </>
  );
};

export default ChatPage;
