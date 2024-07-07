const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/dbConn");
const { corsOptions } = require("./config/corsOptions");
const router = require("./routes/root");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json()); //For APIs receiving JSON data
app.use(cors(corsOptions)); ///corsOptions
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "public")));

app.use(router);

// Catch-all middleware for unsupported routes
app.all("*", (req, res, next) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "Page not found" });
  } else {
    res.type("txt").send("Page not found");
  }
});

// Error-handling middleware (if you have one) goes last
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (!res.headersSent) {
    res.status(500).send("Something broke!");
  }
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  }
};

startServer();

mongoose.connection.on("error", (err) => {
  console.log(err);
});
