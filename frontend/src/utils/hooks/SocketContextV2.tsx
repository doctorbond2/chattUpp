import React, {
  useState,
  useEffect,
  ReactNode,
  useContext,
  createContext,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { defaultSCV2I, SocketContextV2Interface } from '../../types/chatTypes';
import { useAuth } from './AuthContext';
import localStorageKit from '../helper/localstorageKit';
type Props = {};

const SocketV2Context = createContext<SocketContextV2Interface>(defaultSCV2I);
export const useSocketV2 = () => useContext(SocketV2Context);
export const SocketContextV2Provider = ({ children }: any) => {
  const { loggedIn } = useAuth();
  const newSocket: Socket = io(import.meta.env.VITE_ServerPort);
  const [room, setRoom] = useState('');
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    if (loggedIn.access) {
      const newSocket: Socket = io(import.meta.env.VITE_ServerPort);

      newSocket.on('connect', () => {
        console.log('Connected to server');
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      newSocket.on('error', (error: any) => {
        console.error('Socket error:', error);
      });
      setSocket(newSocket);
    }

    return () => {
      newSocket.disconnect();
    };
  }, [loggedIn]);

  return (
    <SocketV2Context.Provider
      value={{
        socket,
        room,
        setRoom,
      }}
    >
      {children}
    </SocketV2Context.Provider>
  );
};
