const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/dbConn");
const { corsOptions } = require("./config/corsOptions");

const app = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser);

connectDB();

mongoose.connection.once("open", () => {
  // on first time connecting to db
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
