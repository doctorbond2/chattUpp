import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useChat } from '../../utils/hooks/ChatContext';
import { ProfileInfo } from '../../types/userTypes';
type Props = {
  profileData: ProfileInfo;
};

const ChatBox: React.FC<Props> = ({ profileData }) => {
  const { messages, messageReceived } = useChat();
  console.log('Chatbox messages: ', messages);
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
                messages.reverse().map((message: any) => {
                  return <p>{message.textContent}</p>;
                })}
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChatBox;
