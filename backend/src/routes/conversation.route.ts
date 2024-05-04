import express from 'express';
import { ENV } from '../config/serverKeys.js';
const router = express.Router();
import Conversation from '../models/conversation.model.js';
import {
  verifyAccessTokenMiddleware as vToken,
  VerifyKeyMiddleware as vKey,
} from '../middleware/auth.middleware.js';
import {
  createNewConvoController,
  getConversations,
  deactivateConversation,
} from '../controllers/conversation.controller.js';
const { conv_route_CREATE, conv_route_GET_LIST, conv_route_DEACTIVATE } =
  process.env as unknown as ENV;
router.post(conv_route_CREATE, vKey, vToken, createNewConvoController);
router.get(conv_route_GET_LIST, vKey, vToken, getConversations);
router.put('/update', async (req, res) => {
  console.log('hi');
  try {
    const result = await Conversation.findByIdAndUpdate(
      '662eaa9d7151ec85f1660d13',
      req.body
    );
    console.log(result);
  } catch (err) {
    return res.status(500).json('error');
  }
});
router.put(conv_route_DEACTIVATE, vKey, vToken, deactivateConversation);
export default router;
