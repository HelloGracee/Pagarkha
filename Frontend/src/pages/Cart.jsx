import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const loadCart = async () => {
    if (!user) return;

    const res = await fetch(
      `http://localhost:5000/api/cart/${user._id}`
    );

    const data = await res.json();
    setCartItems(data.items || []);
  };

  useEffect(() => {
    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () =>
      window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const handleRemove = async (productId) => {
    await fetch("http://localhost:5000/api/cart/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        productId,
      }),
    });

    loadCart();
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "40px" }}>
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.productId} style={{ marginBottom: "20px" }}>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <p>Qty: {item.quantity}</p>

              <button onClick={() => handleRemove(item.productId)}>
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;