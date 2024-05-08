// ChatContext.js
import {
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
const socket: Socket = io(import.meta.env.VITE_ServerPort);
import convoAPI from '../helper/apiHandlers/convoApi';
// import { Conversation } from '../../types/chatTypes';

const ChatContext = createContext<ChatContextInterface>(
  defaultChatContextState
);
export const useChat = () => useContext(ChatContext);
type ChatProviderProps = {
  children: ReactNode;
};
export const ChatProvider = ({ children }: ChatProviderProps) => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected 1');
    });
    return () => {
      socket.on('connect', () => {
        console.log('Socket connected 2');
      });
    };
  }, []);
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState('');
  // const [messageReceived, setMessageReceived] = useState('');
  // const [activeConversation, setActiveConversation] = useState<
  //   Conversation | {}
  // >({});

  const sendMessage = async (message: Message) => {
    console.log('Sent message: ' + message + ' ' + 'To Room:' + room);
    try {
      socket.emit('send_message', { message, room });
      await convoAPI.addNewMessage(message);
    } catch (err: any) {
      console.log(err.message);
    }
  };
  // const returnSender = (both: string[], friend: string) => {
  //   const you: any = both.find((you) => you !== friend);
  //   if (you) {
  //     return you._id;
  //   }
  // };
  const switchToConversation = async (friendId: string) => {
    if (room.length > 0) {
      leaveRoom();
      console.log('Left the current room');
    }
    try {
      const conversation: any = await convoAPI.verifyConversation(friendId);
      if (conversation) {
        const { data } = conversation;
        const { _id, messages } = data;
        await joinRoom(_id);
        setMessages([...messages].reverse());
        // setActiveConversation(conversation.data);
        // const sender = returnSender(conversation.data?.participants, friendId);
      }
    } catch (err: any) {
      console.log('Error caught! ', err.message);
    }
  };
  const joinRoom = async (conversationId: string) => {
    socket.emit('join_room', conversationId);
    socket.on('receive_message', messageHandler);
    console.log('Added messageHandler');
    setRoom(conversationId);
  };
  const onMount = () => {
    console.log('onMount');
    console.log('current messages: ', messages);
    socket.on('receive_message', messageHandler);
  };
  const offMount = () => {
    console.log('offMount');
    socket.off('receive_message', messageHandler);
  };
  const messageHandler = (message: Message) => {
    console.log('Incoming data: ', message);
    socket.off('receive_message', messageHandler);
    setMessages((prev) => [...prev, message]);
  };
  const leaveRoom = async () => {
    if (room !== '') {
      try {
        socket.emit('leave_room', room);
      } catch (err: any) {
        throw err;
      }
    }
    setRoom('');
  };

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

        switchToConversation,
        messageHandler,
        onMount,
        offMount,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
