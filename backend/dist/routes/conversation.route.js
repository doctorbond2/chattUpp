import express from 'express';
const router = express.Router();
import { createNewConvoController } from '../controllers/conversation.controller.js';
const { conv_route_CREATE } = process.env;
router.post(conv_route_CREATE, createNewConvoController);
export default router;
