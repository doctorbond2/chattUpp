import { ProfileInfo } from './userTypes';
export interface Conversation {
  participants: ProfileInfo[];
  messages: string[];
  _id?: string;
  active?: boolean;
  hasNewMessage?: boolean;
  hasChatter?: boolean;
  chatActive?: boolean;
  updatedAt?: string;
  createdAt?: string;
}
export interface Message {
  textContent: string;
  sentBy?: any;
  receivedBy?: any;
  conversation?: string;
  date?: Date | string;
}
export interface ChatContextInterface {
  leaveRoom: (conversation: string) => void;
  joinRoom: (roomId: string) => void;
  sendMessage: (message: Message) => Promise<void>;
  room: string;
  messages: Message[];
  switchToConversation: (friendId: string) => Promise<void>;
  messageHandler: (message: Message) => void;
  onMount: () => void;
  offMount: () => void;
}
export const defaultChatContextState = {
  leaveRoom: (conversation: string) => {
    let something = conversation;
    something = '';
  },
  joinRoom: (roomId: string) => {
    let something = roomId;
    console.log(something);
  },
  sendMessage: async (message: Message) => {
    let something = message;
    something.textContent = '';
    console.log(something.textContent);
  },
  room: '',
  messages: [],
  switchToConversation: async (friendId: string) => {
    let something = friendId;
    console.log(something);
  },
  messageHandler: () => {},
  onMount: () => {},
  offMount: () => {},
};
export interface SocketContextV2Interface {
  socket: any;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
}
export const defaultSCV2I = {
  socket: null,
  room: '',
  setRoom: () => {},
};
// textContent: {
//     type: String,
//     default: 'I am a message',
//   },
//   sentBy: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   recievedBy: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   conversation: {
//     type: Schema.Types.ObjectId,
//     ref: 'Conversation',
//     required: true,
//   },
