const express  = require("express");
const authRoutes = require("./routes/auth.routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/URL", authRoutes);

//server created
module.exports = app;
