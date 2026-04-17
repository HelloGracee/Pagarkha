const express = require("express");
const Review = require("../models/reviewModel");

const router = express.Router();


// ✅ GET ONLY APPROVED REVIEWS (for frontend)
router.get("/", async (req, res) => {
  const reviews = await Review.find({ isApproved: true });
  res.json(reviews);
});


// ✅ GET ALL REVIEWS (for testing / admin)
router.get("/all", async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});


// ✅ ADD REVIEW
router.post("/", async (req, res) => {
  const { name, comment, rating } = req.body;

  const review = new Review({
    name,
    comment,
    rating,
    isApproved: false // 🔥 CHANGE THIS (no need compass)
  });

  await review.save();
  res.json(review);
});


// ✅ APPROVE REVIEW (optional admin)
router.put("/:id/approve", async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (review) {
    review.isApproved = true;
    await review.save();
    res.json({ message: "Approved" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});


module.exports = router;