import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
type Props = {};

const ChatBox: React.FC<Props> = ({}) => {
  return (
    <>
      {' '}
      <Container>
        <Row>
          <Col
            xs={8}
            className={'border rounded'}
            style={{ height: '40vh' }}
          ></Col>
          {/* <Col xs={4} className={'bg-danger'}>
      asd
    </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default ChatBox;
