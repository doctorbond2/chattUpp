import express from "express";
const router = express.Router();
import {
  createUser,
  getUserProfile,
  getUserList,
} from "../controllers/user.controller.js";
router.post("/create", createUser);
router.get("/profile/:id", getUserProfile);
router.get("/list", getUserList);
router.post("/update/:id");

export default router;
