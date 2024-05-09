import { useState, useEffect, useContext, createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { defaultSCV2I, SocketContextV2Interface } from '../../types/chatTypes';
import { useAuth } from './AuthContext';
import localStorageKit from '../helper/localstorageKit';

const SocketV2Context = createContext<SocketContextV2Interface>(defaultSCV2I);
export const useSocketV2 = () => useContext(SocketV2Context);
export const SocketContextV2Provider = ({ children }: any) => {
  const { loggedIn } = useAuth();
  const newSocket: Socket = io(import.meta.env.VITE_ServerPort);
  const [room, setRoom] = useState('');
  const [socket, setSocket] = useState<any>(null);

  const addToStorageList = (data: any) => {
    localStorageKit.addToRoom(data.joiner, data.room);
  };
  const removeFromStorageList = (data: any) => {
    localStorageKit.removeFromRoom(data.leaver, data.room);
  };
  useEffect(() => {
    if (loggedIn.access) {
      const newSocket: Socket = io(import.meta.env.VITE_ServerPort);

      newSocket.on('connect', () => {
        console.log('Connected to server');
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
      newSocket.on('join_room', addToStorageList);
      newSocket.on('leave_room', removeFromStorageList);
      newSocket.on('error', (error: any) => {
        console.error('Socket error:', error);
      });
      setSocket(newSocket);
    }

    return () => {
      newSocket.off('leave_room', removeFromStorageList);
      newSocket.off('join_room', addToStorageList);
      newSocket.disconnect();
    };
  }, [loggedIn]);

  // useEffect(() => {
  //   socket.on('join_room', addToStorageList);
  //   return () => {
  //     socket.off('join_room', addToStorageList);
  //   };
  // }, [socket]);
  // useEffect(() => {
  //   socket.on('leave_room', removeFromStorageList);
  //   return () => {
  //     socket.off('leave_room', removeFromStorageList);
  //   };
  // }, [socket]);
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
