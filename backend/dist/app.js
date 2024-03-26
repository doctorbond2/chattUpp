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
app.use();
app.use(function (req, res, next) {
    cors({
        origin: ALLOWED_ORIGINS,
    });
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});
app.use("/api/v1/users", userRouter);
app.use("/", (req, res) => {
    res.send("Server is up and running!!" + process.env.PORT);
});
export default app;
