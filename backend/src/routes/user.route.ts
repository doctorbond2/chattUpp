import express from 'express';
const router = express.Router();
import {
  createUser,
  getUserProfile,
  getUserList,
  updateUserController,
  detailedUserController,
} from '../controllers/user.controller.js';
import { verifyAccessTokenMiddleware } from '../middleware/auth.middleware.js';
import { ENV } from '../config/serverKeys.js';
const {
  user_route_CREATE,
  user_route_ID_PROFILE,
  user_route_LIST,
  user_route_UPDATE_ONE_ID,
  user_route_PROFILE_DETAILS,
} = process.env as unknown as ENV;
router.post(user_route_CREATE, createUser);
router.get(user_route_ID_PROFILE, getUserProfile);
router.get(
  user_route_PROFILE_DETAILS,
  verifyAccessTokenMiddleware,
  detailedUserController
);
router.get(user_route_LIST, getUserList);
router.put(user_route_UPDATE_ONE_ID, updateUserController);
export default router;
