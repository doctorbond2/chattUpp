export const checkIfFriend = (friendId: string, friends: any[]) => {
  if (friends) {
    const yourFriends: any[] = friends;
    for (const friend of yourFriends) {
      if (friend._id === friendId) {
        return true;
      }
    }
  }
  return false;
};
