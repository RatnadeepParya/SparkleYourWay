require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ordersRouter = require("./routes/orders");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/orders", ordersRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
