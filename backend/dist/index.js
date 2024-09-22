import { RUN_SERVER } from './config/dbConfig.js';
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;
const DATABASE_PATH = isProduction
    ? process.env.MONGODB_URI || 'default_production_db_path'
    : process.env.DATABASE_PATH || 'default_development_db_path';
console.log(PORT);
RUN_SERVER(DATABASE_PATH, PORT);
