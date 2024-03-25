import { RUN_SERVER } from "./config/dbConfig.js";
const PORT = process.env.PORT || 3000;
const DATABASE_PATH = process.env.DATABASE_PATH || "undefined";
console.log(123);
RUN_SERVER(DATABASE_PATH, PORT);
