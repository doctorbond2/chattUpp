import express from "express";
const router = express.Router();
import { loginUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
router.post("/login", verifyToken, loginUser);
export default router;
