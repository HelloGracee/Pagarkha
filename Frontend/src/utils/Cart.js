// 🔥 SAFE GET USER KEY
const getKey = (user) => {
  try {
    return user && user._id ? `cart_${user._id}` : "cart_guest";
  } catch {
    return "cart_guest";
  }
};

// ✅ GET CART
export const getCart = (user) => {
  try {
    return JSON.parse(localStorage.getItem(getKey(user))) || [];
  } catch {
    return [];
  }
};

// ✅ SAVE CART (central function 🔥)
const saveCart = (cart, user) => {
  localStorage.setItem(getKey(user), JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

// ✅ ADD TO CART
export const addToCart = (product, user) => {
  if (!product || !product._id) return;

  let cart = getCart(user);

  const existing = cart.find(item => item._id === product._id);

  if (existing) {
    cart = cart.map(item =>
      item._id === product._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart, user);
};

// ✅ REMOVE ITEM
export const removeFromCart = (id, user) => {
  let cart = getCart(user).filter(item => item._id !== id);
  saveCart(cart, user);
};

// 🔼 INCREASE QTY
export const increaseQty = (id, user) => {
  let cart = getCart(user).map(item =>
    item._id === id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );

  saveCart(cart, user);
};

// 🔽 DECREASE QTY
export const decreaseQty = (id, user) => {
  let cart = getCart(user)
    .map(item =>
      item._id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter(item => item.quantity > 0);

  saveCart(cart, user);
};

// ✅ COUNT (total items)
export const getCartCount = (user) => {
  const cart = getCart(user);
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// ✅ TOTAL PRICE
export const getCartTotal = (user) => {
  const cart = getCart(user);
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

// ✅ CLEAR CART
export const clearCart = (user) => {
  localStorage.removeItem(getKey(user));
  window.dispatchEvent(new Event("cartUpdated"));
};