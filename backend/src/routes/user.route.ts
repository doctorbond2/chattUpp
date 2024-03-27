import express from "express";
const router = express.Router();
import { createUser, loginUser } from "../controllers/user.controller.js";

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/profile", (req, res) => {
  res.send("hej");
});

export default router;
