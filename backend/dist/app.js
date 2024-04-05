import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
const app = express();
const ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://chatt-upp-client.vercel.app",
    `${process.env.CLIENT_URL}`,
    "https://*.vercel.app",
];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.listen("/api/v1/auth");
app.use("/", (req, res) => {
    console.log("test");
    res.json({ message: "Server is up and running!!" });
});
export default app;
