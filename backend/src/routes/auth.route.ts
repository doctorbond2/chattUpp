import express from 'express';
const router = express.Router();
import { loginUser } from '../controllers/auth.controller.js';
import { ENV } from '../config/serverKeys.js';
import {
  startUpCheckToken,
  refreshController,
} from '../controllers/auth.controller.js';
import { tokenTestOne, tokenTestTwo } from '../middleware/auth.middleware.js';
import { VerifyKeyMiddleware as vKey } from '../middleware/auth.middleware.js';
const {
  auth_route_LOGIN,
  auth_route_TEST_TEST,
  auth_route_START_VERIFY_TOKENS,
  auth_route_REFRESH_TOKEN,
}: ENV = process.env as unknown as ENV;
router.post(auth_route_LOGIN, vKey, loginUser);
router.get(auth_route_TEST_TEST, tokenTestOne, vKey, tokenTestTwo);
router.get(auth_route_START_VERIFY_TOKENS, vKey, startUpCheckToken);
router.post(auth_route_REFRESH_TOKEN, vKey, refreshController);
export default router;
