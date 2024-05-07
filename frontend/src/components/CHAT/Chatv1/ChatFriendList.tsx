import React, { useState, useEffect } from 'react';
import { ProfileInfo } from '../../../types/userTypes';
import { useAuth } from '../../../utils/hooks/AuthContext';
import UserAPI from '../../../utils/helper/apiHandlers/userApi';
import ChatterWindow from '../Chatv2/ChatterWindow';
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { all } from 'axios';
type Props = {
  friends: any;
  handleActiveConversation: (friendId: string) => Promise<void>;
  profileData: ProfileInfo;
};

const ChatFriendList: React.FC<Props> = ({
  friends,
  handleActiveConversation,
  profileData,
}) => {
  const { loggedIn, fetchUserProfile } = useAuth();
  const [allUsersList, setAllUsersList] = useState<ProfileInfo[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        refreshChatterList();
      } catch (err: any) {
        console.log(err.message);
      }
    };
    fetchData();
    if (loggedIn.access) {
      navigate('/chat');
    }
  }, []);
  const refreshChatterList = async () => {
    try {
      const response = await UserAPI.getUserList();
      if (response) {
        console.log('refreshed chatter list');
        console.log(response.data);
        console.log(allUsersList);
        await fetchUserProfile();
        setAllUsersList(response.data);
        console.log(allUsersList);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <>
      <div style={{ borderLeft: '1px solid lightgray', overflow: 'auto' }}>
        <h2>All current chatters!</h2>
        {allUsersList &&
          allUsersList
            .filter((user) => user._id !== profileData._id)
            .map((user: ProfileInfo, i: number) => {
              return (
                <ChatterWindow
                  key={'i' + i + 'chattUser'}
                  {...{ profileData, user, refreshChatterList }}
                />
              );
            })}
      </div>
    </>
  );
};

export default ChatFriendList;
