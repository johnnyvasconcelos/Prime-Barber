import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || process.env.DB_HOST,
  user: process.env.MYSQL_USER || process.env.DB_USER,
  password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD,
  database: process.env.MYSQL_DATABASE || process.env.DB_NAME,
  port: process.env.MYSQL_PORT || process.env.DB_PORT || 12207,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool.promise();
