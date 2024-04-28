import React, { useEffect, useState } from 'react';
import { ActiveUser } from '../types/userTypes';
import { useNavigate } from 'react-router-dom';
import { ProfileInfo, defaultProfileInfo } from '../types/userTypes';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import PrProfile from '../components/SOCIAL/profile/PrProfile';
import UserAPI from '../utils/helper/apiHandlers/userApi';
import NotFound from '../components/SIMPLE/NotFound';
import FriendList from '../components/SOCIAL/profile/FriendList';
import { useAuth } from '../utils/hooks/AuthContext';
type Props = {};

const ProfilePage: React.FC<Props> = ({}) => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  const redirectOnNoUser = () => {
    navigate('/login');
  };
  const [profileData, setProfileData] =
    useState<ProfileInfo>(defaultProfileInfo);
  useEffect(() => {
    const fetchProfileData = async () => {
      console.log('Fetching data');
      try {
        const response = await UserAPI.getUserDetails();
        if (response) {
          console.log('You got a response!', response);
          setProfileData(response.data);
        }
      } catch (err: any) {
        console.log('ERROR BRUH', err.message);
        redirectOnNoUser();
      }
    };
    fetchProfileData();
  }, []);

  useEffect(() => {
    console.log('PROFILEDATA: ', profileData);
  }, [profileData]);
  return (
    <>
      {profileData && loggedIn?.access ? (
        <div>
          (
          <>
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="profile" title="Profile">
                {profileData && <PrProfile {...{ profileData }} />}
              </Tab>
              <Tab eventKey="friends" title="Friends">
                <FriendList friends={profileData.friends} />
              </Tab>
              <Tab eventKey="settings" title="Settings">
                Tab content for settings
              </Tab>
              {loggedIn?.adminToken && (
                <Tab eventKey="admin" title="Admin">
                  You are admin
                </Tab>
              )}
            </Tabs>{' '}
          </>
          ){' '}
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ProfilePage;
