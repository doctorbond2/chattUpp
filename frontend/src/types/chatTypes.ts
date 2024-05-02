import { ProfileInfo } from './userTypes';
export interface Conversation {
  participants: ProfileInfo[];
  messages: string[];
  _id?: string;
}
export interface Message {
  textContent: string;
  sentBy?: string;
  receivedBy?: string;
  conversation?: string;
  date?: Date | string;
}
export interface ChatContextInterface {
  leaveRoom: (conversation: string) => void;
  joinRoom: (roomId: string) => void;
  sendMessage: (message: Message) => Promise<void>;
  room: string;
  messages: Message[];
  messageReceived: string;
  switchToConversation: (friendId: string) => Promise<void>;
  messageHandler: (message: Message) => void;
  onMount: () => void;
  offMount: () => void;
}
export const defaultChatContextState = {
  leaveRoom: (conversation: string) => {},
  joinRoom: (roomId: string) => {},
  sendMessage: async (message: Message) => {},
  room: '',
  messages: [],
  messageReceived: '',
  switchToConversation: async (friendId: string) => {},
  messageHandler: () => {},
  onMount: () => {},
  offMount: () => {},
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
