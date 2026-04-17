import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import "./Navbar.css";
import { getCartCount } from "../utils/cart";

const Navbar = () => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(getCartCount());

    update();

    window.addEventListener("cartUpdated", update);

    return () => window.removeEventListener("cartUpdated", update);
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
        <Link to="/wishlist"><FaHeart /></Link>

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