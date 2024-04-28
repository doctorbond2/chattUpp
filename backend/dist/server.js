import { Server } from 'socket.io';
import http from 'http';
import app from './app.js';
const ALLOWED_ORIGINS = [
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
    socket.on('join_room', (data) => {
        console.log('Room', data);
        socket.join(data);
    });
    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data);
    });
});
export default server;
