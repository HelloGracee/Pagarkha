import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate(); // ✅ MUST be inside component

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="products-page">

      <h1>All Products</h1>

      <div className="products-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">

            <img src={p.image} alt={p.name} />

            <h3>{p.name}</h3>

            <p className="price">₹{p.price}</p>

            {/* ✅ BUTTON HERE */}
            <button onClick={() => navigate(`/product/${p._id}`)}>
              View Details
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Products;