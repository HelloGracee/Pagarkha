import { useEffect, useState } from "react";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  const approveReview = async (id) => {
    await fetch(`http://localhost:5000/api/reviews/${id}/approve`, {
      method: "PUT",
    });

    alert("Approved");
    window.location.reload();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Manage Reviews</h2>

      {reviews.map(r => (
        <div key={r._id}>
          <p>{r.comment}</p>
          <button onClick={() => approveReview(r._id)}>
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminReviews;