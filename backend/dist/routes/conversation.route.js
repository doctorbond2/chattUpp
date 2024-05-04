var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
const router = express.Router();
import Conversation from '../models/conversation.model.js';
import { verifyAccessTokenMiddleware as vToken, VerifyKeyMiddleware as vKey, } from '../middleware/auth.middleware.js';
import { createNewConvoController, getConversations, deactivateConversation, activateConversation, deleteConversation, } from '../controllers/conversation.controller.js';
const { conv_route_CREATE, conv_route_GET_LIST, conv_route_DEACTIVATE, conv_route_ACTIVATE, } = process.env;
router.post(conv_route_CREATE, vKey, vToken, createNewConvoController);
router.get(conv_route_GET_LIST, vKey, vToken, getConversations);
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hi');
    try {
        const result = yield Conversation.findByIdAndUpdate(req.params.id, req.body);
    }
    catch (err) {
        return res.status(500).json('error');
    }
}));
router.delete('/delete/delete/:id', deleteConversation);
router.put(conv_route_DEACTIVATE, vKey, vToken, deactivateConversation);
router.put(conv_route_ACTIVATE, vKey, vToken, activateConversation);
export default router;
