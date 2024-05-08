import { admin, client, user } from '../axiosInstanceConfig';
import { AdminTokens } from '../../types/authTypes';
import { Conversation } from '../../types/chatTypes';

type StorageRoom = {
  users: string[];
  conversation: string;
};
class LocalStorageKit {
  constructor() {}
  STORAGE_TOKEN_KEY = import.meta.env.VITE_STORAGE_TOKEN_KEY;
  setTokensInStorage(tokens: AdminTokens) {
    localStorage.setItem(this.STORAGE_TOKEN_KEY, JSON.stringify(tokens));
    user.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;
    if (tokens.adminToken) {
      user.defaults.headers.common[
        'Admin-Authorization'
      ] = `Bearer ${tokens.access}`;
    }
  }
  getTokensFromStorage() {
    const tokens = localStorage.getItem(this.STORAGE_TOKEN_KEY);
    if (tokens) {
      const parsedTokens = JSON.parse(tokens);
      user.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${parsedTokens?.access}`;
      if (parsedTokens?.adminAccess) {
        admin.defaults.headers.common[
          'Admin-Authorization'
        ] = `Bearer ${parsedTokens?.adminAccess}`;
      }
      return parsedTokens;
    }
    return null;
  }
  deleteTokenFromStorage() {
    localStorage.removeItem(this.STORAGE_TOKEN_KEY);
    delete client.defaults.headers.common['Authorization'];
    delete admin.defaults.headers.common['Admin-Authorization'];
  }
  notificationStorage(conversationId: any) {
    const toStore = conversationId;

    let currentStorage: any =
      localStorage.getItem('notifications_list') || '[]';
    let toUpdate = JSON.parse(currentStorage);
    if (!toUpdate.includes(toStore)) {
      toUpdate.push(toStore);
    }
    localStorage.setItem('notifications_list', JSON.stringify(toUpdate));
  }
  removeNotification(conversationId: any) {
    let currentStorage: any =
      localStorage.getItem('notifications_list') || '[]';
    let toUpdate: any[] = JSON.parse(currentStorage);
    const index = toUpdate.findIndex((x) => x === conversationId);
    toUpdate.splice(index, 1);
    localStorage.setItem('notifications_list', JSON.stringify(toUpdate));
  }
  getNotificationList(convoList: Conversation[]) {
    let currentStorage: any =
      localStorage.getItem('notifications_list') || '[]';
    const notificationsList = JSON.parse(currentStorage);
    return convoList.map((c: Conversation) => {
      for (const n of notificationsList) {
        if (c._id === n) {
          c.hasNewMessage = true;
          break;
        }
      }
      return c;
    });
  }
  getNavNotification() {
    let currentStorage: any =
      localStorage.getItem('notifications_list') || '[]';
    const notificationsList = JSON.parse(currentStorage);
    return notificationsList;
  }
  addToRoom(userId: string, roomId: string) {
    let currentStorage: any = localStorage.getItem('room_list') || '[]';
    let roomList: StorageRoom[] = JSON.parse(currentStorage);
    if (roomList.length > 0) {
      roomList.forEach((r) => {
        if (r.users.includes(userId)) {
          const index = r.users.findIndex((u) => u === userId);
          r.users.splice(index, 1);
        }
        if (r.conversation === roomId) {
          if (!r.users.includes(userId)) {
            r.users.push(userId);
          }
        }
      });
      const index = roomList.findIndex((r) => r.conversation === roomId);
      if (index === -1) {
        const newRoom = {
          conversation: roomId,
          users: [userId],
        };
        roomList.push(newRoom);
      }
    } else {
      const newRoom = {
        conversation: roomId,
        users: [userId],
      };
      roomList.push(newRoom);
    }

    localStorage.setItem('room_list', JSON.stringify(roomList));
  }
  removeFromRoom(userId: string, roomId: string) {
    let currentStorage: any = localStorage.getItem('room_list') || '[]';
    let roomList: StorageRoom[] = JSON.parse(currentStorage);
    if (roomList.length > 0) {
      roomList.forEach((r) => {
        if (r.conversation === roomId) {
          if (r.users.includes(userId)) {
            const index = r.users.findIndex((u) => u === userId);
            r.users.splice(index, 1);
            if (r.users.length <= 0) {
              const index = roomList.findIndex(
                (r) => r.conversation === roomId
              );
              roomList.splice(index, 1);
            }
          }
        }
      });
    }
    localStorage.setItem('room_list', JSON.stringify(roomList));
  }
  getRoomList() {
    let currentStorage: any = localStorage.getItem('room_list') || '[]';
    let roomList: StorageRoom[] = JSON.parse(currentStorage);
    return roomList;
  }
  checkIfInActiveRoom(roomId: string, userId: string) {
    const roomList = localStorageKit.getRoomList();

    return (
      roomList.find((r) => {
        console.warn(r);
        console.log(roomId);
        console.error(userId);
        return r.conversation === roomId && r.users.includes(userId);
      }) || null
    );
  }
  clearUserFromRoomListOnRefresh(userId: string) {
    const roomList = localStorageKit.getRoomList();
    roomList.forEach((r, i: number) => {
      const index = r.users.findIndex((u) => {
        return u === userId;
      });

      if (index !== -1) {
        r.users.splice(index, 1);
      }
      console.warn(r.users.length);
      if (r.users.length <= 0) {
        roomList.splice(i, 1);
      }
    });
    localStorage.setItem('room_list', JSON.stringify(roomList));
  }
}

const localStorageKit = new LocalStorageKit();

export default localStorageKit;
