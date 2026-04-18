const express = require("express");
const Cart = require("../models/cartModel");

const router = express.Router();

// ✅ GET USER CART
router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ user: req.params.userId });
  res.json(cart || { items: [] });
});

// ✅ ADD TO CART
router.post("/add", async (req, res) => {
  const { userId, product } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const existing = cart.items.find(
    item => item.productId === product._id
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  await cart.save();
  res.json(cart);
});

// ✅ REMOVE ITEM
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (cart) {
    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();
  }

  res.json(cart);
});

module.exports = router;