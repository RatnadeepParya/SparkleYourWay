import express from "express";
const router = express.Router();

// Get all products
router.get("/", (req, res) => {
  res.json({ products: [] });
});

// Add product (admin)
router.post("/", (req, res) => {
  res.json({ message: "Add product placeholder" });
});

export default router;
