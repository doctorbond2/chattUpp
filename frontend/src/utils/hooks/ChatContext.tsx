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

const ChatContext = createContext<ChatContextInterface>(
  defaultChatContextState
);
export const useChat = () => useContext(ChatContext);
type ChatProviderProps = {
  children: ReactNode;
};
export const ChatProvider = ({ children }: ChatProviderProps) => {
  const socket: Socket = io(import.meta.env.VITE_ServerPort);
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const [activeConversation, setActiveConversation] = useState('');
  const [currentMessages, setCurrentMessages] = useState<Message[]>();
  const sendMessage = async (message: Message) => {
    console.log('Sent message: ' + message + ' ' + 'To Room:' + room);
    try {
      await convoAPI.addNewMessage(message);
      socket.emit('send_message', { message, room });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const switchToConversation = async (friendId: string) => {
    if (friendId !== '') {
      //THIS RETURNS THE CONVERSATION ID
      socket.emit('leave_room', room);
      try {
        const conversation: any = await convoAPI.verifyConversation(friendId);
        if (conversation.data._id !== '') {
          const { data } = conversation;
          const { _id, messages } = data;
          socket.emit('join_room', _id);
          setMessages([...messages].reverse());
          setRoom(_id);
          console.log('Current conversation: ', conversation);

          // setActiveConversation(conversation);
        }
      } catch (err: any) {
        console.log('Error caught! ', err.message);
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
    const messageHandler = (message: Message) => {
      console.log('Incoming data: ', message);
      setMessages((prev) => [...prev, message]);
    };
    socket.on('receive_message', messageHandler);
    return () => {
      console.log('useEffect left socket');
      socket.off('receive_message', messageHandler);
    };
  }, []);

  useEffect(() => {
    console.log('Updated messages: ', messages);
  }, [messages]);
  return (
    <ChatContext.Provider
      value={{
        messages,
        room,
        sendMessage,
        joinRoom,
        leaveRoom,
        messageReceived,
        switchToConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
