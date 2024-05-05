import React, { useEffect } from 'react';

import { Container, Col, Row } from 'react-bootstrap';
import { ProfileInfo } from '../../../types/userTypes';

type Props = {
  profileData: ProfileInfo;
};

const PrProfile: React.FC<Props> = ({ profileData }) => {
  useEffect(() => {
    console.log('INCOMING DATA:', profileData);
  }, []);
  return (
    <>
      {profileData && (
        <Container className="border border-success">
          <Row>
            <Col>{''}</Col>
          </Row>
          <Row>
            <Col>Firstname: {profileData.firstname}</Col>
            <Col>Lastname: {''}</Col>
            <Col>Age: {''}</Col>
            <Col></Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default PrProfile;
