const express = require("express");
const Product = require("../models/productModel");

const router = express.Router();

// ✅ GET ALL PRODUCTS FIRST
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ✅ GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// ✅ POST PRODUCT
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;