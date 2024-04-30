import express from 'express';
import cors from 'cors';
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
io.on('connection', (socket) => {
  console.log('User Connected: ' + socket.id);
  socket.on('join_room', async (data) => {
    console.log('Room', data);
    socket.join(data);
  });
  socket.on('send_message', (data) => {
    console.log('socket on message');
    console.log(data);
    socket.to(data.room).emit('receive_message', data.message);
    console.log('socket sent to: ', data.room);
  });
});

export default server;
