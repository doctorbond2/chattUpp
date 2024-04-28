import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { io, Socket } from 'socket.io-client';
type Props = {};
console.log(import.meta.env.VITE_ServerPort);
const socket: Socket = io(import.meta.env.VITE_ServerPort);
//-----------------------------
//States
const ChatRoom: React.FC = ({}) => {
  const [message, setMessage] = useState('');
  const [messageRecieved, setMessageRecieved] = useState('');
  const [room, setRoom] = useState('');
  const [currentRoom, setCurrentRoom] = useState(room || 'Join a room!');
  // ----------------------------
  //Functions
  const sendMessage = () => {
    console.log('Sent message: ' + message + ' ' + 'To Room:' + room);
    socket.emit('send_message', { message, room });
  };
  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
    setCurrentRoom(room);
  };
  const handleRoom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(room);
    console.log(e.target.value);
    setRoom(e.target.value);
  };
  const handleMessage = (e: any) => {
    setMessage(e.target.value);
    console.log(e.target.value);
  };
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageRecieved(data.message);
    });
  }, [socket]);
  //-----------Return
  return (
    <>
      {' '}
      <h3>Test Chat Area</h3>
      <div>
        <h1>ROOM: {currentRoom}</h1>
        <input type="text" onChange={handleMessage} />
        <Button onClick={sendMessage}>Send</Button>
        <select onChange={handleRoom}>
          <option value={1}>Room 1</option>
          <option value={2}>Room 2</option>
          <option value={3}>Room 3</option>
        </select>
        <button onClick={joinRoom}>Join Room</button>
        <h2>Message:</h2>
        {messageRecieved}
      </div>
      <Container>
        <Row>
          <Col
            xs={8}
            className={'border rounded'}
            style={{ height: '100vh' }}
          ></Col>
          {/* <Col xs={4} className={'bg-danger'}>
        asd
      </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default ChatRoom;
