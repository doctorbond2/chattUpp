import express from "express";
const router = express.Router();
import { loginUser } from "../controllers/auth.controller.js";
import { tokenTestOne, tokenTestTwo } from "../middleware/auth.middleware.js";
router.post("/login", loginUser);
router.get("/test/test", tokenTestOne, tokenTestTwo);
export default router;
