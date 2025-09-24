import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
import orderRoutes from "./routes/orders.js";
import productRoutes from "./routes/products.js";
import adminRoutes from "./routes/admin.js";

app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
