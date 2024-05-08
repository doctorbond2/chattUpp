import React from 'react';

type Props = {
  friends: any;
};

const FriendList: React.FC<Props> = ({ friends }) => {
  return (
    <>
      {friends &&
        friends.map((f: any) => {
          return <p>{f.firstname}</p>;
        })}
    </>
  );
};

export default FriendList;
