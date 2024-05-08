import express from 'express';
const router = express.Router();
import {
  createUser,
  getUserProfile,
  getUserList,
  updateUserController,
  detailedUserController,
  addFriendController,
  removeFriendController,
} from '../controllers/user.controller.js';
import {
  verifyAccessTokenMiddleware as vToken,
  VerifyKeyMiddleware as vKey,
} from '../middleware/auth.middleware.js';
import { ENV } from '../config/serverKeys.js';
const {
  user_route_CREATE,
  user_route_ID_PROFILE,
  user_route_LIST,
  user_route_UPDATE_ONE_ID,
  user_route_PROFILE_DETAILS,
  user_route_ADD_FRIEND,
  user_route_DELETE_FRIEND,
} = process.env as unknown as ENV;
router.post(user_route_CREATE, createUser);
router.get(user_route_ID_PROFILE, vKey, getUserProfile);
router.get(user_route_PROFILE_DETAILS, vKey, vToken, detailedUserController);
router.post(user_route_ADD_FRIEND, vKey, vToken, addFriendController);
router.post(user_route_DELETE_FRIEND, vKey, vToken, removeFriendController);
router.get(user_route_LIST, vKey, getUserList);
router.put(user_route_UPDATE_ONE_ID, vKey, updateUserController);
export default router;
