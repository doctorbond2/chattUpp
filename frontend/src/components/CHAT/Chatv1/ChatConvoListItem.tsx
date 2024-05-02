import React, { useEffect, useState } from 'react';
import { Conversation } from '../../../types/chatTypes';
import { Card } from 'react-bootstrap';
type Props = {
  convo: Conversation;
};

const ChatConvoListItem: React.FC<Props> = ({ convo }) => {
  // const [person1, setPerson1] = useState({
  //   firstname: convo.participants[0]?.firstname,
  //   lastname: convo.participants[0]?.lastname,
  // });
  // const [person2, setPerson2] = useState({
  //   firstname: convo.participants[1]?.firstname,
  //   lastname: convo.participants[1]?.lastname,
  // });
  return (
    <>
      {
        <Card>
          <Card.Body>
            <h2>Firstname {convo.participants[0].firstname}</h2>
            <h2>Firstname {convo.participants[1].firstname}</h2>
          </Card.Body>
        </Card>
      }
    </>
  );
};

export default ChatConvoListItem;
