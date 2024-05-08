import React, { useEffect } from 'react';
import { Message } from '../../../types/chatTypes';
import { ProfileInfo } from '../../../types/userTypes';
import { Card } from 'react-bootstrap';
type Props = {
  message: Message;
  profileData: ProfileInfo;
};

const ChatMessage: React.FC<Props> = ({ message, profileData }) => {
  useEffect(() => {
    // console.log('NEW MESSAGE SENT BY: ', message.sentBy);
  }, []);
  return (
    <>
      {message && profileData && (
        <Card
          style={{
            marginLeft:
              message.sentBy.firstname === profileData.firstname
                ? '0px'
                : '50%',
            width: '50%',
            backgroundColor:
              message.sentBy.firstname === profileData.firstname
                ? 'lightgreen'
                : 'lightblue',
          }}
        >
          <p style={{ marginLeft: '1vw', fontFamily: 'initial' }}>
            {message.textContent}
          </p>
        </Card>
      )}
    </>
  );
};

export default ChatMessage;
