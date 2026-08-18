const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on("connect", () => {
  console.log("Connected successfully to PostgreSQL");
});

pool.on("error", (error) => {
  console.error("Unexpected connection error:", error);
});

module.exports = pool;