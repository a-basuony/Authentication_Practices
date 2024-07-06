const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"), (err) => {
    if (err) {
      console.error("Error sending file:", err);
      next(err); // Pass errors to Express
    }
  });
});

module.exports = router;
