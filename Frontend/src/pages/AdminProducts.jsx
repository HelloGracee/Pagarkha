import { useEffect, useState } from "react";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  // GET PRODUCTS
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // ADD PRODUCT
  const addProduct = async () => {
    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Product added");
    window.location.reload();
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });

    alert("Deleted");
    window.location.reload();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Manage Products</h2>

      {/* ADD PRODUCT */}
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Price" onChange={e => setForm({...form, price: e.target.value})} />
      <input placeholder="Image URL" onChange={e => setForm({...form, image: e.target.value})} />

      <button onClick={addProduct}>Add Product</button>

      <hr />

      {/* PRODUCT LIST */}
      {products.map(p => (
        <div key={p._id}>
          <p>{p.name} - ₹{p.price}</p>
          <button onClick={() => deleteProduct(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminProducts;