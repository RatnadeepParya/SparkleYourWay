import express from "express";
const router = express.Router();

// Example admin route
router.get("/dashboard", (req, res) => {
  res.json({ message: "Admin dashboard placeholder" });
});

export default router;
