import express from "express";
const router = express.Router();

// Create order
router.post("/create", (req, res) => {
  res.json({ message: "Order creation placeholder" });
});

// Razorpay webhook
router.post("/webhook", (req, res) => {
  res.json({ message: "Razorpay webhook placeholder" });
});

export default router;
