import { Link } from "react-router-dom";
import "./Admin.css";

function AdminDashboard() {
  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      <div className="admin-grid">
        <Link to="/admin/products" className="admin-card">
           Manage Products
        </Link>

        <Link to="/admin/reviews" className="admin-card">
          ⭐ Manage Reviews
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;