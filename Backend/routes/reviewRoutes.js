const express = require("express");
const Review = require("../models/reviewModel");

const router = express.Router();


// ✅ GET ONLY APPROVED REVIEWS (Frontend)
router.get("/", async (req, res) => {
  const reviews = await Review.find({ isApproved: true });
  res.json(reviews);
});


// ✅ GET ALL REVIEWS (Admin Panel)
router.get("/all", async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 }); // 🔥 latest first
  res.json(reviews);
});


// ✅ ADD REVIEW
router.post("/", async (req, res) => {
  try {
    const { name, comment, rating } = req.body;

    const review = new Review({
      name,
      comment,
      rating,
      isApproved: false // always pending
    });

    await review.save();
    res.json(review);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ APPROVE REVIEW
router.put("/:id/approve", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (review) {
      review.isApproved = true;
      await review.save();
      res.json({ message: "Review approved" });
    } else {
      res.status(404).json({ message: "Not found" });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ❌ DELETE REVIEW (NEW 🔥)
router.delete("/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;