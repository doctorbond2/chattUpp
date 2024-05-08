import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { ProfileInfo } from '../../../types/userTypes';
import UserAPI from '../../../utils/helper/apiHandlers/userApi';
import convoAPI from '../../../utils/helper/apiHandlers/convoApi';
type Props = {
  profileData: ProfileInfo;
  user: ProfileInfo;
  refreshChatterList: () => Promise<void>;
  // handleActiveConversation: (friendId: string) => Promise<void>;
  socket: any;
};

const ChatterWindow: React.FC<Props> = ({
  profileData,
  user,
  refreshChatterList,
  socket,
}) => {
  useEffect(() => {
    console.warn('ASDASD');
  }, [profileData]);

  // const friendChecker = (friendId: string) => {
  //   if (profileData.friends) {
  //     const index = profileData.friends.findIndex(
  //       (f: any) => f._id === friendId
  //     );
  //     if (index >= 0) {
  //       console.log('You are friends');
  //     } else {
  //       console.log('You are not friends');
  //     }
  //     return index !== -1;
  //   }
  //   return false;
  // };
  const handleAddNewFriend = async (user: ProfileInfo) => {
    if (user) {
      try {
        const response = await UserAPI.addNewFriend(user._id);
        if (response) {
          const convoResponse = await convoAPI.activateConvoWithFriend(
            user._id
          );
          if (convoResponse) {
            socket.emit('add_friend', profileData._id);
            refreshChatterList();
          }
        }
      } catch (err: any) {
        console.log(err.message);
      }
    } else {
      return;
    }
  };
  const handleRemoveFriend = async (user: ProfileInfo) => {
    console.log(user._id);

    if (user) {
      try {
        const response = await UserAPI.removeFriend(user._id);
        if (response) {
          const convoResponse = await convoAPI.deactiveConvoWithFriend(
            user._id
          );
          if (convoResponse) {
            socket.emit('remove_friend', profileData._id);
            refreshChatterList();
          }
        }
      } catch (err: any) {
        console.log(err.message);
      }
    } else {
      return;
    }
  };
  const createNewConversation = async (friendId: string) => {
    if (!friendId) {
      return;
    }
    try {
      const response = await convoAPI.createOneNewConversation(friendId);
      if (response) {
        alert('created new conversation');
        socket.emit('new_conversation');
        refreshChatterList();
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <>
      {user && profileData && (
        <Card style={{ width: '15vw', borderColor: 'blue', margin: '1px' }}>
          <h4>{user?.username}</h4>
          <h6>No. Friends: {user.friends?.length}</h6>
          {user?._id &&
          profileData.friends?.find((f: any) => f._id === user._id) ? (
            <>
              <div>
                <h5>Friends!</h5>
                <Button
                  style={{ backgroundColor: 'red' }}
                  onClick={() => {
                    handleRemoveFriend(user);
                  }}
                >
                  Unfriend
                </Button>
                {profileData.conversations &&
                profileData.conversations?.find((c: any) => {
                  return user.conversations?.includes(c._id);
                }) ? (
                  ''
                ) : (
                  <Button
                    onClick={() => {
                      createNewConversation(user._id);
                    }}
                  >
                    New conversation!
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div>
              <h5>Not friends</h5>
              <Button
                style={{ backgroundColor: 'green' }}
                onClick={() => {
                  handleAddNewFriend(user);
                }}
              >
                Add
              </Button>
            </div>
          )}
        </Card>
      )}
    </>
  );
};

export default ChatterWindow;
