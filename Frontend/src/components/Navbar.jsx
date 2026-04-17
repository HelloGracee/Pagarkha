import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import "./Navbar.css";
import { getCartCount } from "../utils/cart";
import { getWishlistCount } from "../utils/Wishlist";

const Navbar = () => {

  const [count, setCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(getCartCount());

    update();

    window.addEventListener("cartUpdated", update);

    return () => window.removeEventListener("cartUpdated", update);
  }, []);
  useEffect(() => {
  const update = () => setWishCount(getWishlistCount());

  update();

  window.addEventListener("wishlistUpdated", update);

  return () => window.removeEventListener("wishlistUpdated", update);
}, []);

  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <h2 className="logo">Pagarkha.</h2>
      </div>

      {/* CENTER */}
      <ul className="nav-center">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      {/* RIGHT */}
      <div className="nav-right">
        <Link to="/wishlist" className="cart-icon">
        <FaHeart />
        {wishCount > 0 && <span className="badge">{wishCount}</span>}
      </Link>

        <Link to="/cart" className="cart-icon">
          <FaShoppingCart />
          {count > 0 && <span className="badge">{count}</span>}
        </Link>

        <Link to="/login"><FaUser /></Link>
      </div>

    </nav>
  );
};

export default Navbar;