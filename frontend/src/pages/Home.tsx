import React from "react";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GET_request } from "../utils/requestHelpers";
import { ActiveUser } from "../types/userTypes";
import { Card } from "react-bootstrap";
type Props = { loggedIn: ActiveUser | null };
const Home: React.FC<Props> = ({}) => {
  const [test, setTest] = useState<any>(null);
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  console.log("BASE", BaseUrl);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET_request("/user/list");
        console.log("RESPONSE", response[2].firstname);
        if (response) {
          setTest(response[2].firstname);
        } else {
          setTest("Response error");
        }
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchData();
    return () => {
      console.log("Homepage cleanup");
    };
  }, []);
  return (
    <>
      <Container>
        asd
        <div>Homepage</div>
        <h2>{test}</h2>
        <h4>asd</h4>
      </Container>
    </>
  );
};

export default Home;
