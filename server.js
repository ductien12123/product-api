const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// Healthcheck endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Product API is running" });
});

// API Routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/productdb";

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB successfully!");
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err.message);
    });
}

module.exports = app;