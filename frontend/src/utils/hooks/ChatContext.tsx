// ChatContext.js
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Message } from '../../types/chatTypes';
import {
  ChatContextInterface,
  defaultChatContextState,
} from '../../types/chatTypes';
import { io, Socket } from 'socket.io-client';
import convoAPI from '../helper/apiHandlers/convoApi';
const socket: Socket = io(import.meta.env.VITE_ServerPort);
const ChatContext = createContext<ChatContextInterface>(
  defaultChatContextState
);
export const useChat = () => useContext(ChatContext);
type ChatProviderProps = {
  children: ReactNode;
};
export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const sendMessage = (message: Message) => {
    // Implement sending message logic
    setMessages([...messages, message]);
  };
  const switchSocketRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };
  const switchToConversation = async (friendId: string) => {
    if (friendId !== '') {
      //THIS RETURNS THE CONVERSATION ID
      try {
        const conversation = await convoAPI.verifyConversation(friendId);
        if (conversation !== '') {
          socket.emit('join_room', conversation);
          setRoom(conversation);
        }
      } catch (err: any) {
        console.log(err.message);
      }
    }
  };
  const joinRoom = async (conversation: string) => {
    // if (conversation !== '') {
    //   socket.emit('leave_room', conversation);
    //   setRoom(conversation);
    // }
    // setRoom('');
  };

  const leaveRoom = (conversation: string) => {
    if (conversation !== '') {
      socket.emit('leave_room', conversation);
      setRoom(conversation);
    }
    setRoom('');
  };
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        room,
        sendMessage,
        joinRoom,
        leaveRoom,
        switchSocketRoom,
        messageReceived,
        switchToConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
