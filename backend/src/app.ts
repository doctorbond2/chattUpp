import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
const app = express();
const ALLOWED_ORIGINS: string[] = ["http://localhost:5173"];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
  })
);
app.use("/api/v1/users", userRouter);

export default app;
