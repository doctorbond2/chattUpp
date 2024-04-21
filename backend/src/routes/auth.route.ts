import express from "express";
const router = express.Router();
import { loginUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../utilities/helpers/token.helpers.js";
import {
  startUpCheckToken,
  refreshController,
} from "../controllers/auth.controller.js";

import { tokenTestOne, tokenTestTwo } from "../middleware/auth.middleware.js";
router.post("/login", loginUser);
router.get("/test/test", tokenTestOne, tokenTestTwo);
router.get("/start/verify/tokens", startUpCheckToken);
router.post("/refresh/token", refreshController);
export default router;
