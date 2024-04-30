import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useChat } from '../../utils/hooks/ChatContext';
type Props = {};

const ChatBox: React.FC<Props> = ({}) => {
  const { messages } = useChat();
  console.log('Chatbox messages: ', messages);
  return (
    <>
      {' '}
      <Container>
        <Row>
          <Col
            xs={8}
            className={'border rounded'}
            style={{ height: '40vh', overflow: 'auto' }}
          >
            {' '}
            {messages &&
              messages.map((message: any) => {
                return <p>{message.textContent}</p>;
              })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChatBox;
