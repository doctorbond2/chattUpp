import express from "express";
const router = express.Router();
import { createUser, loginUser, getUserProfile, } from "../controllers/user.controller.js";
router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/profile/:id", getUserProfile);
router.get("/user/list");
router.post("/update/:id");
export default router;
