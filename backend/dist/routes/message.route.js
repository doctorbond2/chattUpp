import express from 'express';
const router = express.Router();
import { verifyAccessTokenMiddleware as verifyToken } from '../middleware/auth.middleware.js';
import { addNewMessageToConversationController as newMessage } from '../controllers/message.controller.js';
const { message_route_CREATE } = process.env;
import { deleteAllTheMessages } from '../controllers/message.controller.js';
router.post(message_route_CREATE, verifyToken, newMessage);
router.delete('/massive/delete', deleteAllTheMessages);
export default router;
