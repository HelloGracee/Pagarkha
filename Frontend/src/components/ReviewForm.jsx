import React, { useState } from "react";

const ReviewForm = () => {
  const [form, setForm] = useState({
    name: "",
    comment: "",
    rating: 5
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert("Review submitted!");
    setForm({ name: "", comment: "", rating: 5 });

    window.dispatchEvent(new Event("reviewAdded"));
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h2>Add Review ⭐</h2>

      <input
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <textarea
        placeholder="Your Review"
        value={form.comment}
        onChange={(e) => setForm({ ...form, comment: e.target.value })}
      />

      <select
        value={form.rating}
        onChange={(e) => setForm({ ...form, rating: e.target.value })}
      >
        <option value="5">5 ⭐</option>
        <option value="4">4 ⭐</option>
        <option value="3">3 ⭐</option>
        <option value="2">2 ⭐</option>
        <option value="1">1 ⭐</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewForm;