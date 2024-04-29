export interface Conversation {
  participants: string[];
  messages: string[];
}
export interface Message {
  textContent: string;
  sentBy?: string;
  recievedBy?: string;
}
export interface ChatContextInterface {
  leaveRoom: () => void;
  joinRoom: (roomId: string) => void;
  sendMessage: (message: Message) => void;
  room: string;
  messages: Message[];
  switchSocketRoom: () => void;
}
export const defaultChatContextState = {
  leaveRoom: () => {},
  joinRoom: (roomId: string) => {},
  sendMessage: (message: Message) => {},
  room: '',
  messages: [],
  switchSocketRoom: () => {},
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
