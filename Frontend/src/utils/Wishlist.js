export const getWishlist = () => {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
};

export const addToWishlist = (product) => {
  const wishlist = getWishlist();

  const exists = wishlist.find(item => item._id === product._id);

  if (!exists) {
    wishlist.push(product);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  window.dispatchEvent(new Event("wishlistUpdated"));
};

export const removeFromWishlist = (id) => {
  const wishlist = getWishlist().filter(item => item._id !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  window.dispatchEvent(new Event("wishlistUpdated"));
};

export const getWishlistCount = () => {
  return getWishlist().length;
};