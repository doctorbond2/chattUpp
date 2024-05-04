import React, { useEffect, useState } from 'react';
import { Conversation } from '../../../types/chatTypes';
import { Card, Button } from 'react-bootstrap';
type Props = {
  convo: Conversation;
  handleActiveConversation: (friendId: string) => Promise<void>;
  profileData: any;
  socket: any;
  resetNotification: (conversationId: string) => void;
};

const ChatConvoListItem: React.FC<Props> = ({
  convo,
  handleActiveConversation,
  profileData,
  socket,
  resetNotification,
}) => {
  const convoStyling = {
    backgroundColor: convo.active ? 'white' : 'gray',
    color: convo.active ? 'gray' : 'white',
  };
  const [friend, setFriend] = useState<any>(null);
  const [test, setTest] = useState(false);
  useEffect(() => {
    if (convo.participants[0]._id === profileData._id) {
      setFriend(convo.participants[1]);
    } else {
      setFriend(convo.participants[0]);
    }
  }, [convo, profileData]);
  // const handleNotification = (data: any) => {
  //   if (data.room === convo._id) {
  //     console.log(data.room);
  //     setTest(true);
  //   }
  // };

  // useEffect(() => {
  //   socket.on('receive_message', handleNotification);

  //   return () => {
  //     socket.off('receive_message', handleNotification);
  //   };
  // }, [socket]);
  return (
    <>
      {friend && profileData && (
        <Card style={convoStyling}>
          <Card.Body>
            <h2>Firstname {friend.firstname}</h2>

            <h3>
              {convo.active ? 'Active conversation' : 'Not friends, not active'}
            </h3>
            <Card.Footer>
              {convo.active && (
                <Button
                  onClick={async () => {
                    if (friend._id) {
                      handleActiveConversation(friend._id);
                    }
                    if (convo._id) {
                      resetNotification(convo._id);
                    }
                  }}
                >
                  Start chat!
                </Button>
              )}
              {test && <div>sdsd</div>}
              {convo.hasNewMessage ? 'New messages!' : 'No new messages.'}
            </Card.Footer>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default ChatConvoListItem;
