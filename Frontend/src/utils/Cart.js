export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const addToCart = (product) => {
  const cart = getCart();

  const existing = cart.find(item => item._id === product._id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // update navbar instantly
  window.dispatchEvent(new Event("cartUpdated"));
};

export const removeFromCart = (id) => {
  const cart = getCart().filter(item => item._id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.qty, 0);
};