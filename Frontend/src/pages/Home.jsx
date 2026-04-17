import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [reviews, setReviews] = useState([]);

  // 🔥 Fetch ONLY approved reviews
  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  return (
    <div className="home">

      {/* HERO */}
     <section className="hero-card">
  <h1>Modern Style,<br />Comfort Forward</h1>

  <p>
    Pagarkha offers premium, modern footwear designed for
    performance and everyday luxury.
  </p>

 <div style={{ marginTop: "10px" }}>
  <button>Shop Collection</button>
  <button>Our Story</button>
</div>
</section>

      {/* HOT PICK */}
      <section className="hot">
        <h2>✨ Today’s Hot Pick</h2>

        <div className="hot-card">
          <h3>The Apex Runner</h3>
          <p>
            Experience the perfect blend of ultralight materials
            and maximum cushioning.
          </p>
          <button>Shop This Style →</button>
        </div>
      </section>

      {/* ⭐ REVIEWS FROM DB */}
      <section className="reviews">
        <h2>💬 What Our Customers Say</h2>

        <div className="review-grid">
          {reviews.map((r) => (
            <div key={r._id} className="review-card">
              <p>"{r.comment}"</p>
              <h4>- {r.name}</h4>
              <span>⭐ {r.rating}/5</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;