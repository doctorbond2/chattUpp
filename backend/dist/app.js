import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
const app = express();
const ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://chatt-upp-client.vercel.app",
];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ALLOWED_ORIGINS,
}));
app.use("/api/v1/users", userRouter);
app.use("/", (req, res) => {
    res.send("Server is up and running!!" + process.env.PORT);
});
export default app;
