import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ProfileInfo } from '../../../types/userTypes';
import { io, Socket } from 'socket.io-client';
import { Message } from '../../../types/chatTypes';
type Props = {
  profileData: ProfileInfo;
  messages: Message[];
  onMount: () => void;
  offMount: () => void;
  room: string;
  socket: any;
};

const ChatBox: React.FC<Props> = ({
  profileData,
  messages,
  onMount,
  offMount,
  room,
  socket,
}) => {
  console.log('Chatbox messages: ', messages);
  useEffect(() => {
    console.log('trying to mount');
    onMount();
    return () => {
      offMount();
    };
  }, [socket]);

  return (
    <>
      <Container>
        <Row>
          <Col
            xs={8}
            className={'border rounded'}
            style={{ height: '40vh', overflow: 'auto' }}
          >
            <>
              {' '}
              {messages.reverse() &&
                messages.reverse().map((message: any, i: number) => {
                  return <p key={'messagea194' + i}>{message.textContent}</p>;
                })}
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChatBox;
