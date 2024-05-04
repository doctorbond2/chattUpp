import React from 'react';
import { checkIfFriend } from '../../../utils/hooks/generalHooks';
import { Card } from 'react-bootstrap';
import { ProfileInfo } from '../../../types/userTypes';
import UserAPI from '../../../utils/helper/apiHandlers/userApi';

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
  const friendChecker = (friendId: string) => {
    if (profileData.friends) {
      const yourFriends: any[] = profileData.friends;
      for (const friend of yourFriends) {
        if (friend._id === friendId) {
          return true;
        }
      }
    }
    return false;
  };
  const handleAddNewFriend = async (user: ProfileInfo) => {
    if (user) {
      try {
        const response = await UserAPI.addNewFriend(user._id);
        if (response) {
          console.log(response.data);
          refreshChatterList();
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
          refreshChatterList();
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
      {user && (
        <Card style={{ width: '10vw' }}>
          <h2>{user.firstname}</h2>
          <h3>No. Friends: {user.friends?.length}</h3>
          {friendChecker(user._id) ? (
            <>
              <div>
                <h3>Friends!</h3>
                <button
                  onClick={async () => {
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
                onClick={async () => {
                  handleAddNewFriend(user);
                }}
              >
                Add
              </button>
            </div>
          )}
        </Card>
      )}
    </>
  );
};

export default ChatterWindow;
