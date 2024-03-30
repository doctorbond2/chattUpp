import React, { useEffect, useState } from "react";
import { ActiveUser } from "../types/userTypes";
import { GET_request } from "../utils/requestHelpers";
import { useNavigate } from "react-router-dom";
import { ProfileInfo, defaultProfileInfo } from "../types/userTypes";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";

type Props = {
  loggedIn: ActiveUser | null;
};

const Profile: React.FC<Props> = ({ loggedIn }) => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] =
    useState<ProfileInfo>(defaultProfileInfo);
  useEffect(() => {
    if (loggedIn?.id === null) {
      navigate("/login");
    }
    const fetchData = async () => {
      if (loggedIn && loggedIn.id) {
        const response = await GET_request(
          "/api/v1/users/profile/" + loggedIn.id
        );
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
              <Tab eventKey="home" title="Profile">
                <Container className="border border-success">
                  <Row>
                    <Col>{userProfile.username}</Col>
                  </Row>
                  <Row>
                    <Col>Firstname: {userProfile.firstname}</Col>
                    <Col>Lastname: {userProfile.lastname}</Col>
                    <Col>
                      Age: {userProfile.age ? userProfile.age : "Unknown"}
                    </Col>
                  </Row>
                </Container>
              </Tab>
              <Tab eventKey="friends" title="Friends">
                Tab content for Profile
              </Tab>
              <Tab eventKey="settings" title="Settings">
                Tab content for Contact
              </Tab>
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

export default Profile;
