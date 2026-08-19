require("dotenv").config();
const PORT = process.env.PORT || 8000;

const db = require("./config/db");
const cors = require("cors");
const express = require("express");
const studentRoutes = require("./routes/crud.route");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(201).json({
    success: true,
    message: "Welcome"
  })
});

app.use("/students", studentRoutes);

const startServer = async () => {
  await db;
  app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`);
  });
};

startServer();
