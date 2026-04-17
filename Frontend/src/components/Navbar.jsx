import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import "./Navbar.css";
import { getCartCount } from "../utils/cart";
import { getWishlistCount } from "../utils/Wishlist";

const Navbar = () => {

  const [count, setCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false); // 🔥 NEW

  const user = JSON.parse(localStorage.getItem("user")); // 🔥 NEW

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

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

        {/* 🔥 USER ICON WITH DROPDOWN */}
        <div className="user-menu">
          <div onClick={() => setShowMenu(!showMenu)} style={{ cursor: "pointer" }}>
            <FaUser />
          </div>

          {showMenu && user && (
            <div className="dropdown">
              <p onClick={() => window.location.href = "/profile"}>Profile</p>
              <p onClick={() => window.location.href = "/orders"}>My Orders</p>
              <p onClick={logout}>Logout</p>
            </div>
          )}

          {!user && (
            <div onClick={() => window.location.href = "/login"} style={{ cursor: "pointer" }}>
              <FaUser />
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;