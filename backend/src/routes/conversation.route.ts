import express from 'express';
import { ENV } from '../config/serverKeys.js';
const router = express.Router();
import Conversation from '../models/conversation.model.js';
import { verifyAccessTokenMiddleware } from '../middleware/auth.middleware.js';
import {
  createNewConvoController,
  getConversations,
} from '../controllers/conversation.controller.js';
const { conv_route_CREATE, conv_route_GET_LIST } =
  process.env as unknown as ENV;
router.post(
  conv_route_CREATE,
  verifyAccessTokenMiddleware,
  createNewConvoController
);
router.get(conv_route_GET_LIST, verifyAccessTokenMiddleware, getConversations);
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

export default router;
