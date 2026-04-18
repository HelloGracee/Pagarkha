import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import "./Navbar.css";
import { getCartCount } from "../utils/cart";
import { getWishlistCount } from "../utils/Wishlist";

const Navbar = () => {

  const [count, setCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const logout = () => {
    localStorage.removeItem("user");

    // 🔥 RESET COUNTS
    setCount(0);
    setWishCount(0);
    setUser(null);

    window.location.href = "/login";
  };

 useEffect(() => {
  const update = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (currentUser) {
      setUser(currentUser);
      setCount(getCartCount(currentUser)); // 🔥 FIX
      setWishCount(getWishlistCount());
    } else {
      setUser(null);
      setCount(0);
      setWishCount(0);
    }
  };

  update();

  window.addEventListener("cartUpdated", update);
  window.addEventListener("wishlistUpdated", update);
  window.addEventListener("storage", update);

  return () => {
    window.removeEventListener("cartUpdated", update);
    window.removeEventListener("wishlistUpdated", update);
    window.removeEventListener("storage", update);
  };
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

        {/* Wishlist */}
        <Link to="/wishlist" className="cart-icon">
          <FaHeart />
          {user && wishCount > 0 && (
            <span className="badge">{wishCount}</span>
          )}
        </Link>

        {/* Cart */}
        {user ? (
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {count > 0 && <span className="badge">{count}</span>}
          </Link>
        ) : (
          <div
            className="cart-icon"
            onClick={() => window.location.href = "/login"}
            style={{ cursor: "pointer" }}
          >
            <FaShoppingCart />
          </div>
        )}

        {/* USER */}
        <div className="user-menu">

          {user ? (
            <>
              <div
                className="user-box"
                onClick={() => setShowMenu(!showMenu)}
              >
                {user?.isAdmin ? "Admin" : user?.name}
              </div>

              {showMenu && (
                <div className="dropdown">
                  <p onClick={() => window.location.href = "/profile"}>Profile</p>
                  <p onClick={() => window.location.href = "/orders"}>My Orders</p>

                  {user?.isAdmin && (
                    <p onClick={() => window.location.href = "/admin"}>
                      Admin Dashboard
                    </p>
                  )}

                  <p onClick={logout}>Logout</p>
                </div>
              )}
            </>
          ) : (
            <div
              onClick={() => window.location.href = "/login"}
              style={{ cursor: "pointer" }}
            >
              <FaUser />
            </div>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;