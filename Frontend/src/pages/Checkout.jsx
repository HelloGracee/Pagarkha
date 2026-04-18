import { useEffect, useState } from "react";
import "./Checkout.css";
import { getCart } from "../utils/cart"; // 🔥 IMPORTANT

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const cart = getCart(); // ✅ FIXED
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

    // 🔥 REMOVE ONLY CURRENT USER CART
    const key = user ? `cart_${user._id}` : "cart_guest";
    localStorage.removeItem(key);

    window.dispatchEvent(new Event("cartUpdated"));

    alert("Order placed!");
  };

  return (
    <div>
      <h2>Checkout</h2>

      {cartItems.map(item => (
        <p key={item._id}>
          {item.name} - ₹{item.price}
        </p>
      ))}

      <h3>Total: ₹{total}</h3>

      <input
        placeholder="Enter address"
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default Checkout;