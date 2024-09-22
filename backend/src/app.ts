import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import convoRouter from './routes/conversation.route.js';
import messageRouter from './routes/message.route.js';
const ALLOWED_ORIGINS: string[] = [
  'http://localhost:5173',
  'https://chattupp-client.onrender.com',
];
const app = express();
//`${process.env.CLIENT_URL}`
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  cors({
    origin: ALLOWED_ORIGINS,
  });
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization, Admin-Authorization'
  );
  next();
});
app.use('/api/chatupp/user', userRouter);
app.use('/api/chatupp/auth', authRouter);
app.use('/api/chatupp/convo', convoRouter);
app.use('/api/chatupp/message', messageRouter);
app.use('/', (req, res) => {
  res.json({ message: 'Server is up and running!!' });
});

export default app;
