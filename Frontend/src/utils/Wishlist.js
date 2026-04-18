const getKey = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? `wishlist_${user._id}` : "wishlist_guest";
};

export const getWishlist = () => {
  return JSON.parse(localStorage.getItem(getKey())) || [];
};

export const addToWishlist = (product) => {
  let list = getWishlist();
  list.push(product);
  localStorage.setItem(getKey(), JSON.stringify(list));

  window.dispatchEvent(new Event("wishlistUpdated"));
};

export const removeFromWishlist = (id) => {
  let list = getWishlist().filter(item => item._id !== id);
  localStorage.setItem(getKey(), JSON.stringify(list));

  window.dispatchEvent(new Event("wishlistUpdated"));
};

export const getWishlistCount = () => {
  return getWishlist().length;
};