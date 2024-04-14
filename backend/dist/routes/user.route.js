import express from "express";
const router = express.Router();
import { createUser, getUserProfile } from "../controllers/user.controller.js";
router.post("/create", createUser);
router.get("/profile/:id", getUserProfile);
router.get("/user/list");
router.post("/update/:id");
export default router;
