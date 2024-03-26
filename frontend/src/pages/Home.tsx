import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActiveUser } from "../types/userTypes";
type Props = { loggedIn: ActiveUser | null };
const Home: React.FC<Props> = ({}) => {
  const [test, setTest] = useState<any>(null);
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  console.log(BaseUrl);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BaseUrl + "/");
        if (response) {
          setTest(response.data);
          console.log(response.data);
        }
        {
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
      <h2>{test && test}</h2>
    </>
  );
};

export default Home;
