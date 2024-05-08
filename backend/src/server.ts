import { Server } from 'socket.io';
import http from 'http';
import app from './app.js';
const ALLOWED_ORIGINS: string[] = [
  'http://localhost:5173',
  'https://chatt-upp-client.vercel.app',
  'https://*.vercel.app',
];
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'x-client-key',
      'x-client-token',
      'x-client-secret',
      'Authorization',
      'Admin-Authorization',
    ],
  },
});
// io.on('connection', (socket) => {
//   console.log('connected: ', socket.id);
//   socket.on('send_message', (data) => {
//     console.log('correct', data);
//     socket.emit('receive_message', data);
//     socket.broadcast.emit('receive_message', data);
//   });
// });
io.on('connection', (socket) => {
  console.log('User Connected: ' + socket.id);
  socket.on('join_room', (data) => {
    console.log('joined', data.room);
    socket.broadcast.emit('join_notification', data.room);
    socket.broadcast.emit('join_room', data);
    socket.emit('join_room', data);
    socket.join(data.room);
  });
  socket.on('leave_room', (data) => {
    try {
      if (!data) {
        throw new Error('Room name is required.');
      }
      socket.emit('leave_room', data);
      socket.broadcast.emit('leave_room', data);
      socket.leave(data.room);
    } catch (error: any) {
      console.error('Error leaving room:', error.message);
    }
  });
  socket.on('send_message', (data) => {
    console.log('Incoming from room: ', data.room);
    socket.to(data.room).emit('receive_message', data.message);
    socket.emit('receive_message', data.message);
    socket.broadcast.emit('notification_message', data);
  });
});
export default server;
