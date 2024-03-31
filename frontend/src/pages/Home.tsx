import React from "react";
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
        const response = await GET_request("/");
        console.log("RESPONSE", response);
        if (response.data) {
          setTest(response.data);
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
      <div>Homepage</div>
      <h2>{test && test.message}</h2>
      <h4>asd</h4>
      <Card>
        {" "}
        <h1>Hello world!</h1>
      </Card>
    </>
  );
};

export default Home;
