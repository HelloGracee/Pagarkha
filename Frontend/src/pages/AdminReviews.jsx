import React, { useEffect, useState } from "react";
import "./AdminReviews.css";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reviews/all");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ✅ APPROVE
  const approveReview = async (id) => {
    await fetch(`http://localhost:5000/api/reviews/${id}/approve`, {
      method: "PUT",
    });

    fetchReviews(); // 🔥 refresh UI
  };

  // ✅ DELETE
  const deleteReview = async (id) => {
    await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "DELETE",
    });

    fetchReviews(); // 🔥 refresh UI
  };

  return (
    <div className="admin-reviews">
      <h2>Manage Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className="review-card">

            <h4>{r.name}</h4>
            <p>{r.comment}</p>
            <p>⭐ {r.rating}</p>

            <div className="actions">
              {!r.isApproved ? (
                <button
                  className="approve"
                  onClick={() => approveReview(r._id)}
                >
                  Approve
                </button>
              ) : (
                <span className="approved">Approved</span>
              )}

              <button
                className="delete"
                onClick={() => deleteReview(r._id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default AdminReviews;