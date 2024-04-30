import React, { useState } from 'react';
import { useChat } from '../../utils/hooks/ChatContext';
import { ProfileInfo } from '../../types/userTypes';
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
        friends.map((f: any) => {
          return (
            <>
              <div
                onClick={async () => {
                  await handleActiveConversation(f._id);
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
