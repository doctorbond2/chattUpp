import React from "react";
import { Container, Col, Row } from "react-bootstrap";
type Props = {};

const PrProfile = ({}) => {
  return (
    <>
      {" "}
      <Container className="border border-success">
        <Row>
          <Col>{userProfile.username}</Col>
        </Row>
        <Row>
          <Col>Firstname: {userProfile.firstname}</Col>
          <Col>Lastname: {userProfile.lastname}</Col>
          <Col>Age: {userProfile.age ? userProfile.age : "Unknown"}</Col>
        </Row>
      </Container>
    </>
  );
};

export default PrProfile;
