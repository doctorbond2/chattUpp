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
  activateConversation,
  deleteConvoAndMessages,
} from '../controllers/conversation.controller.js';
const {
  conv_route_CREATE,
  conv_route_GET_LIST,
  conv_route_DEACTIVATE,
  conv_route_ACTIVATE,
  conv_route_DELETE_ONE_CONVERSATION,
} = process.env as unknown as ENV;
router.post(conv_route_CREATE, vKey, vToken, createNewConvoController);
router.get(conv_route_GET_LIST, vKey, vToken, getConversations);
router.put('/update/:id', async (req, res) => {
  console.log('hi');
  try {
    const result = await Conversation.findByIdAndUpdate(
      req.params.id,
      req.body
    );
  } catch (err) {
    return res.status(500).json('error');
  }
});
// router.delete('/delete/delete/:id', vKey, vToken, deleteConversation);
router.delete(
  conv_route_DELETE_ONE_CONVERSATION,
  vKey,
  vToken,
  deleteConvoAndMessages
);
router.put(conv_route_DEACTIVATE, vKey, vToken, deactivateConversation);
router.put(conv_route_ACTIVATE, vKey, vToken, activateConversation);

export default router;
