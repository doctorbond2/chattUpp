import React from 'react';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { GET_request } from '../utils/requestHelpers';
import { ProfileInfo } from '../types/userTypes';
import { useAuth } from '../utils/hooks/AuthContext';

import { Card } from 'react-bootstrap';
type Props = {};
const Home: React.FC<Props> = ({}) => {
  const { loggedIn, profileData } = useAuth();
  const [test, setTest] = useState<any>(null);
  const [allUsersList, setAllUsersList] = useState<ProfileInfo[]>([]);
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET_request('/user/list');
        if (response) {
          setTest(response[2].firstname);
          setAllUsersList(response);
        } else {
          setTest('Response error');
        }
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchData();
    return () => {
      console.log('Homepage cleanup');
    };
  }, []);
  const checkIfFriend = (friendId: string) => {
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
  return (
    <>
      <Container>
        <div>Homepage</div>
        <h2>All current chatters!</h2>
        {allUsersList &&
          allUsersList.map((user: ProfileInfo) => {
            return (
              <Card style={{ width: '10vw' }}>
                <h2>{user.firstname}</h2>
                <h3>No. Friends: {user.friends?.length}</h3>
                {checkIfFriend(user._id) ? (
                  <div>Friends!</div>
                ) : (
                  <button>Add friend</button>
                )}
              </Card>
            );
          })}
        <h2>{test}</h2>
        <h4>asd</h4>
      </Container>
    </>
  );
};

export default Home;
