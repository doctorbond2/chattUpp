import express from "express";
const router = express.Router();
import { createUser } from "../controllers/user.controller.js";
router.post("/create", createUser);
router.get("/", (req, res) => {
    res.send("hej");
});
export default router;
