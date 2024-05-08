import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { ProfileInfo } from '../../../types/userTypes';
import UserAPI from '../../../utils/helper/apiHandlers/userApi';
import convoAPI from '../../../utils/helper/apiHandlers/convoApi';
import { useNavigate } from 'react-router-dom';
import { Conversation } from '../../../types/chatTypes';

type Props = {
  profileData: ProfileInfo;
  user: ProfileInfo;
  refreshChatterList: () => Promise<void>;
};

const ChatterWindow: React.FC<Props> = ({
  profileData,
  user,
  refreshChatterList,
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
          console.log('USER ADD RESPONSE: ', response.data);
          const convoResponse = await convoAPI.activateConvoWithFriend(
            user._id
          );
          if (convoResponse) {
            console.log('CONVO RESPONSE: ', convoResponse);
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
    if (user) {
      try {
        const response = await UserAPI.removeFriend(user._id);
        if (response) {
          console.log(response.data);
          const convoResponse = await convoAPI.deactiveConvoWithFriend(
            user._id
          );
          if (convoResponse) {
            console.log('CONVO RESPONSE: ', convoResponse);
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

  return (
    <>
      {user && user.friends && (
        <Card style={{ width: '10vw' }}>
          <h2>{user?.firstname}</h2>
          <h6>No. Friends: {user.friends?.length}</h6>
          {user?._id &&
          profileData.friends?.find((f: any) => f._id === user._id) ? (
            <>
              <div>
                <h5>Friends!</h5>
                <button
                  onClick={() => {
                    handleRemoveFriend(user);
                  }}
                >
                  Remove
                </button>
              </div>
            </>
          ) : (
            <div>
              <h3>Not friends</h3>
              <button
                onClick={() => {
                  handleAddNewFriend(user);
                }}
              >
                Add
              </button>
            </div>
          )}
          {profileData.conversations &&
            profileData.conversations?.find((c: any) => {
              return user.conversations?.includes(c._id);
            }) && <button>asd</button>}
        </Card>
      )}
    </>
  );
};

export default ChatterWindow;
