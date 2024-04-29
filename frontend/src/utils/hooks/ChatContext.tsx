// ChatContext.js
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message } from '../../types/chatTypes';
import {
  ChatContextInterface,
  defaultChatContextState,
} from '../../types/chatTypes';
import { io, Socket } from 'socket.io-client';
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

  const sendMessage = (message: Message) => {
    // Implement sending message logic
    setMessages([...messages, message]);
  };
  const switchSocketRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };
  const joinRoom = (roomId: string) => {
    // Implement joining room logic
    setRoom(roomId);
  };

  const leaveRoom = () => {
    // Implement leaving room logic
    setRoom('');
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        room,
        sendMessage,
        joinRoom,
        leaveRoom,
        switchSocketRoom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
