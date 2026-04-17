import { useEffect, useState } from "react";
import "./Checkout.css"; // ✅ make sure this is added

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const orderData = {
      items: cartItems,
      totalAmount: total,
      address,
      paymentMethod: "COD",
    };

    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(orderData),
    });

    localStorage.removeItem("cart");
    alert("Order placed!");
  };

  // 🔥 REPLACE ONLY THIS RETURN
  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      {cartItems.length === 0 ? (
        <p className="empty-text">Your cart is empty</p>
      ) : (
        <div className="checkout-box">
          
          {cartItems.map((item, index) => (
            <div className="checkout-item" key={index}>
              <span className="item-name">{item.name}</span>
              <span>₹{item.price} × {item.quantity}</span>
            </div>
          ))}

          <div className="checkout-total">
            Total: ₹{total}
          </div>

          <textarea
            className="checkout-textarea"
            placeholder="Enter delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button className="checkout-btn" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;