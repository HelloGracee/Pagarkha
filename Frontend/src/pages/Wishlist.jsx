import React, { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../utils/Wishlist";
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleRemove = (id) => {
    removeFromWishlist(id);
    setWishlist(getWishlist());
  };

  return (
    <div className="wishlist-page">
      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        wishlist.map(item => (
          <div key={item._id} className="wishlist-item">

            <img src={item.image} alt={item.name} />

            <div>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>

            <button onClick={() => handleRemove(item._id)}>
              Remove
            </button>

          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;