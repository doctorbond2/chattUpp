import express from 'express';
const router = express.Router();
import { ENV } from '../config/serverKeys';
import { verifyAccessTokenMiddleware as verifyToken } from '../middleware/auth.middleware.js';
import { addNewMessageToConversationController as newMessage } from '../controllers/message.controller.js';
const { message_route_CREATE } = process.env as unknown as ENV;
router.post(message_route_CREATE, verifyToken, newMessage);
export default router;
