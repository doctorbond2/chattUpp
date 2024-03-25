import React from "react";
import { useEffect } from "react";
import { ActiveUser } from "../types/userTypes";
type Props = { loggedIn: ActiveUser | null };
const Home: React.FC<Props> = ({}) => {
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  console.log(BaseUrl);
  useEffect(() => {
    return () => {
      console.log("Homepage cleanup");
    };
  }, []);
  return (
    <>
      <div>Homepage</div>
    </>
  );
};

export default Home;
