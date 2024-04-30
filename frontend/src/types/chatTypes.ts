export interface Conversation {
  participants: string[];
  messages: string[];
}
export interface Message {
  textContent: string;
  sentBy?: string;
  receivedBy?: string;
}
export interface ChatContextInterface {
  leaveRoom: (conversation: string) => void;
  joinRoom: (roomId: string) => void;
  sendMessage: (message: Message) => void;
  room: string;
  messages: Message[];
  messageReceived: Message | {};
  switchToConversation: (friendId: string) => Promise<void>;
}
export const defaultChatContextState = {
  leaveRoom: (conversation: string) => {},
  joinRoom: (roomId: string) => {},
  sendMessage: (message: Message) => {},
  room: '',
  messages: [],
  messageReceived: {},
  switchToConversation: async (friendId: string) => {},
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
