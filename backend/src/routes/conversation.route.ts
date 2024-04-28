import express from 'express';
import { ENV } from '../config/serverKeys.js';
const router = express.Router();
import { createNewConvoController } from '../controllers/conversation.controller.js';
const { conv_route_CREATE } = process.env as unknown as ENV;
router.post(conv_route_CREATE, createNewConvoController);
export default router;
