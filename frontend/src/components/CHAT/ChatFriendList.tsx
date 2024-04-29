import React from 'react';

type Props = {
  friends: any;
  handleActiveRoom: (target: string) => void;
  switchSocketRoom: () => void;
};

const ChatFriendList: React.FC<Props> = ({
  friends,
  handleActiveRoom,
  switchSocketRoom,
}) => {
  return (
    <>
      {friends &&
        friends.map((f: any) => {
          return (
            <>
              <div
                onClick={() => {
                  handleActiveRoom(f._id);
                }}
              >
                <h2>{f.firstname}</h2>
                <h3>{f._id}</h3>
              </div>
            </>
          );
        })}
    </>
  );
};

export default ChatFriendList;
