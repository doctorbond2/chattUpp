import React, { useEffect, useState } from 'react';
import { Conversation } from '../../../types/chatTypes';
import { Card, Button } from 'react-bootstrap';
import convoAPI from '../../../utils/helper/apiHandlers/convoApi';
import Spinner from 'react-bootstrap/Spinner';
import { Message } from '../../../types/chatTypes';
type Props = {
  convo: Conversation;
  handleActiveConversation: (friendId: string) => Promise<void>;
  profileData: any;
  resetNotification: (conversationId: string) => void;
  socket: any;
};

const ChatConvoListItem: React.FC<Props> = ({
  convo,
  handleActiveConversation,
  profileData,
  resetNotification,
  socket,
}) => {
  const convoStyling = {
    backgroundColor:
      convo.active && convo.chatActive
        ? 'yellow'
        : convo.active
        ? 'white'
        : 'gray',
    color: convo.active ? 'gray' : 'white',
    fontFamily: 'Arial',
  };
  const [friend, setFriend] = useState<any>(null);
  const [latestMessage, setLatestMessage] = useState<Message>();
  useEffect(() => {
    const getLatestMessage = async () => {
      if (convo._id) {
        try {
          const response = await convoAPI.getLatestMessage(convo._id);
          if (response) {
            console.log(response.data[0]);
            setLatestMessage(response.data[0] || null);
          }
        } catch (err: any) {
          console.log(err.message);
        }
      }
    };
    if (convo._id) {
      getLatestMessage();
    }
  }, [convo]);
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
    console.log(convo._id);
    const yes = confirm(
      'Are you sure you want to delete this conversation and all its messages?'
    );
    if (!yes) {
      return;
    }
    try {
      const response = await convoAPI.deleteConvoWithFriend(friend._id);
      if (response?.status === 204) {
        alert('Conversation deleted.');
        socket.emit('delete_conversation', convo._id);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <>
      {friend &&
      profileData &&
      convo.messages.length > 0 &&
      !convo.hasNewMessage ? (
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
            </Card.Footer>
            {latestMessage?.sentBy !== profileData._id &&
              `Latest message from: ${friend?.firstname}`}
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
                      Join Chat!
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
            </Card.Footer>
            {latestMessage?.sentBy !== profileData._id &&
              `Latest message from: ${friend?.firstname}`}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default ChatConvoListItem;
