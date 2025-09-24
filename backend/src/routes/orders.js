const express = require("express");
const router = express.Router();

// example route
router.get("/", (req, res) => {
  res.json({ message: "Orders API is working!" });
});

module.exports = router;
