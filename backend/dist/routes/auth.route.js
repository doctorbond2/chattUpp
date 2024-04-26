import express from 'express';
const router = express.Router();
import { loginUser } from '../controllers/auth.controller.js';
import { startUpCheckToken, refreshController, } from '../controllers/auth.controller.js';
import { tokenTestOne, tokenTestTwo } from '../middleware/auth.middleware.js';
const { auth_route_LOGIN, auth_route_TEST_TEST, auth_route_START_VERIFY_TOKENS, auth_route_REFRESH_TOKEN, } = process.env;
router.post(auth_route_LOGIN, loginUser);
router.get(auth_route_TEST_TEST, tokenTestOne, tokenTestTwo);
router.get(auth_route_START_VERIFY_TOKENS, startUpCheckToken);
router.post(auth_route_REFRESH_TOKEN, refreshController);
export default router;
