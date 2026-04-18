import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import { addToWishlist } from "../utils/Wishlist";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        product,
      }),
    });

    // 🔥 Update navbar
    window.dispatchEvent(new Event("cartUpdated"));

    alert("Added to cart");
  };

  const handleWishlist = () => {
    addToWishlist(product);
  };

  return (
    <div className="product-detail">

      <img src={product.image} alt={product.name} />

      <div>
        <h1>{product.name}</h1>
        <p className="price">₹{product.price}</p>
        <p>{product.description}</p>

        <button onClick={handleAddToCart}>
          Add to Cart
        </button>

        <button onClick={handleWishlist}>
          ❤️ Add to Wishlist
        </button>
      </div>

    </div>
  );
};

export default ProductDetail;