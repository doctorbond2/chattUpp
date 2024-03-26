import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActiveUser } from "../types/userTypes";
type Props = { loggedIn: ActiveUser | null };
const Home: React.FC<Props> = ({}) => {
  const [test, setTest] = useState<any>(null);
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  console.log("BASE", BaseUrl);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BaseUrl + "/");
        console.log("RESPONSE", response.statusText);
        if (response.statusText === "OK") {
          response.data && setTest(response.data);
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
    </>
  );
};

export default Home;
