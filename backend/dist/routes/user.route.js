import express from "express";
const router = express.Router();
import { createUser, loginUser, getUserProfile, } from "../controllers/user.controller.js";
router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/profile/:id", getUserProfile);
export default router;
