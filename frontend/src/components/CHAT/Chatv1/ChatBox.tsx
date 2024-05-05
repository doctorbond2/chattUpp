import React, { useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ProfileInfo } from '../../../types/userTypes';
import { io, Socket } from 'socket.io-client';
import { Message } from '../../../types/chatTypes';
import ChatMessage from './ChatMessage';

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
  const chatWindow: any = useRef(null);
  const scrollToBottom = () => {
    if (chatWindow.current) {
      chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
    }
  };
  console.log('Chatbox messages: ', messages);
  useEffect(() => {
    console.log('trying to mount');
    onMount();
    return () => {
      offMount();
    };
  }, [socket]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <>
      <Container>
        <Row>
          <Col
            xs={8}
            className={'border rounded'}
            style={{ height: '70vh', overflow: 'auto', width: '600px' }}
            ref={chatWindow}
          >
            <>
              {' '}
              {profileData &&
                messages &&
                messages.map((message: any, i: number) => {
                  return (
                    <>
                      <p></p>
                      <ChatMessage key={i} {...{ message, profileData }} />
                    </>
                  );
                })}
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChatBox;
