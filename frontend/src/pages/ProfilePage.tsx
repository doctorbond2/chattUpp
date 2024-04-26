import React, { useEffect, useState } from "react";
import { ActiveUser } from "../types/userTypes";
import { GET_request } from "../utils/requestHelpers";
import { useNavigate } from "react-router-dom";
import { ProfileInfo, defaultProfileInfo } from "../types/userTypes";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import PrProfile from "../components/SOCIAL/profile/ProfileInfo";
const { VITE_user_route_ID_PROFILE: ID_route } = import.meta.env;
type Props = {
  loggedIn: ActiveUser | null;
};

const ProfilePage: React.FC<Props> = ({ loggedIn }) => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] =
    useState<ProfileInfo>(defaultProfileInfo);
  useEffect(() => {
    if (loggedIn?.access === null) {
      navigate("/login");
    }
    const fetchData = async () => {
      if (loggedIn?.access) {
        const response = await GET_request(ID_route);
        console.log(response.data);
        if (response.data) {
          setUserProfile({ ...defaultProfileInfo, ...response.data });
        }
      } else {
        return;
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        {userProfile ? (
          <>
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="profile" title="Profile">
                <PrProfile />
              </Tab>
              <Tab eventKey="friends" title="Friends">
                Tab content for friends
              </Tab>
              <Tab eventKey="settings" title="Settings">
                Tab content for settings
              </Tab>
              {loggedIn?.adminToken && (
                <Tab eventKey="admin" title="Admin">
                  You are admin
                </Tab>
              )}
            </Tabs>{" "}
          </>
        ) : (
          "Loading profile..."
        )}
      </div>
      <button
        onClick={() => {
          console.log(userProfile);
        }}
      >
        asd
      </button>
    </>
  );
};

export default ProfilePage;
