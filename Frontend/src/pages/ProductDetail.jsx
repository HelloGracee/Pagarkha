import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import { addToCart } from "../utils/cart";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="product-detail">

      <img src={product.image} alt={product.name} />

      <div>
        <h1>{product.name}</h1>
        <p className="price">₹{product.price}</p>
        <p>{product.description}</p>

        <button onClick={() => addToCart(product)}>
            Add to Cart
            </button>
      </div>

    </div>
  );
};

export default ProductDetail;