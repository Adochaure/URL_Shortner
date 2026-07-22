const express  = require("express");
const authRoutes = require("./routes/auth.routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : false,
}));
app.use(express.json());
app.use("/api/URL", authRoutes);

//server created
module.exports = app;
