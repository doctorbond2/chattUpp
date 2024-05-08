import React, { useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ProfileInfo } from '../../../types/userTypes';
import { Message } from '../../../types/chatTypes';
import ChatMessage from './ChatMessage';

type Props = {
  profileData: ProfileInfo;
  messages: Message[];
  onMount: () => void;
  offMount: () => void;
  socket: any;
};

const ChatBox: React.FC<Props> = ({
  profileData,
  messages,
  onMount,
  offMount,
  socket,
}) => {
  const chatWindow: any = useRef(null);
  const scrollToBottom = () => {
    if (chatWindow.current) {
      chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
    }
  };
  useEffect(() => {
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
                messages.reverse().map((message: any, i: number) => {
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
