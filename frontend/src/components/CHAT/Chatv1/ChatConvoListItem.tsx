import React, { useEffect, useState } from 'react';
import { Conversation } from '../../../types/chatTypes';
import { Card, Button } from 'react-bootstrap';
import convoAPI from '../../../utils/helper/apiHandlers/convoApi';
import localStorageKit from '../../../utils/helper/localstorageKit';
import Spinner from 'react-bootstrap/Spinner';
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
    backgroundColor:
      convo.active && convo.hasChatter
        ? 'yellow'
        : convo.active
        ? 'white'
        : 'gray',
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
  const formattedTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  const handleConvoDeletion = async () => {
    const yes = confirm(
      'Are you sure you want to delete this conversation and all its messages?'
    );
    if (!yes) {
      return;
    }
    try {
      const response = await convoAPI.deleteConvoWithFriend(friend._id);
    } catch (err: any) {
      console.log(err.message);
    }
  };
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
      {friend && profileData && convo.messages.length > 0 ? (
        <Card style={convoStyling}>
          <Card.Header>
            {convo.hasNewMessage && <Spinner animation="grow" />}
            {convo.hasNewMessage && 'New messages!'}
          </Card.Header>
          <Card.Body>
            <h5>{friend?.firstname + ' ' + friend?.lastname}</h5>
            <h6>{!convo.active && 'Not friends, not active'}</h6>
            <h6>{convo.hasChatter && 'ACTIVE CHAT'}</h6>
            <h6>
              {convo.updatedAt
                ? formattedTimestamp(convo.updatedAt)
                : convo.createdAt
                ? formattedTimestamp(convo.createdAt)
                : ''}
            </h6>
            <Card.Footer>
              {convo.active && (
                <>
                  <div>
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
                      Join chat!
                    </Button>
                    <Button
                      style={{ backgroundColor: 'red' }}
                      onClick={handleConvoDeletion}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}

              {test && <div>sdsd</div>}
            </Card.Footer>
          </Card.Body>
        </Card>
      ) : (
        /////// SECOND CARD EMPTY MESSAGES
        <Card style={convoStyling}>
          <Card.Header>
            {convo.hasNewMessage && <Spinner animation="grow" />}
            {convo.hasNewMessage && 'New messages!'}
          </Card.Header>
          <Card.Body>
            <h5>{friend?.firstname + ' ' + friend?.lastname}</h5>
            <h6>
              {convo.active ? 'Friend' : 'Not friends - blocked conversation.'}
            </h6>
            <Card.Footer>
              {convo.active && (
                <>
                  <div>
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
                      Start new chat!
                    </Button>
                    <Button
                      style={{ backgroundColor: 'red' }}
                      onClick={handleConvoDeletion}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}

              {test && <div>sdsd</div>}
            </Card.Footer>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default ChatConvoListItem;
