import express from 'express';
const router = express.Router();
import { ENV } from '../config/serverKeys';
import {
  verifyAccessTokenMiddleware as verifyToken,
  VerifyKeyMiddleware as vKey,
} from '../middleware/auth.middleware.js';
import {
  addNewMessageToConversationController as newMessage,
  getLatestMessageFromConversation,
} from '../controllers/message.controller.js';
const { message_route_CREATE, message_route_GET_LATEST_MESSAGE } =
  process.env as unknown as ENV;
import { deleteAllTheMessages } from '../controllers/message.controller.js';
router.post(message_route_CREATE, verifyToken, newMessage);
router.delete('/massive/delete', deleteAllTheMessages);
router.get(
  message_route_GET_LATEST_MESSAGE,
  vKey,
  verifyToken,
  getLatestMessageFromConversation
);
export default router;
