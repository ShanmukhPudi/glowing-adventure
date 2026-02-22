import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";

const Navbar = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!admin) return null; // Don't show sidebar on login page

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>ATLANTIS</h2>
        <p>Admin Panel</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/hotels"
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        >
          <span>🏨</span> Hotels
        </NavLink>
        <NavLink
          to="/bookings"
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        >
          <span>📋</span> Bookings
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-user">{admin.email}</p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Navbar;