import express from "express";
const router = express.Router();
import { createUser, getUserProfile, getUserList, updateUserController, } from "../controllers/user.controller.js";
router.post("/create", createUser);
router.get("/profile/:id", getUserProfile);
router.get("/list", getUserList);
router.put("/update/user/:id", updateUserController);
export default router;
