import React, { useState } from 'react';
import { ProfileInfo } from '../../../types/userTypes';
type Props = {
  friends: any;
  handleActiveConversation: (friendId: string) => Promise<void>;
  profileData: ProfileInfo;
};

const ChatFriendList: React.FC<Props> = ({
  friends,
  handleActiveConversation,
  profileData,
}) => {
  return (
    <>
      {friends &&
        friends.map((f: any, i: number) => {
          return (
            <>
              <button
                key={'f-1a' + i}
                onClick={async () => {
                  handleActiveConversation(f._id);
                }}
              >
                <h2>{f.firstname}</h2>
              </button>
              <br></br>
            </>
          );
        })}
    </>
  );
};

export default ChatFriendList;
