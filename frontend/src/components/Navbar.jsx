import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          Atlantis <span>Hotels</span>
        </NavLink>

        <nav className="navbar-links">
          {user ? (
            <>
              <NavLink
                to="/my-bookings"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                My Bookings
              </NavLink>
              <span style={{ color: "#bbb", fontSize: "0.85rem" }}>
                Hi, {user.name.split(" ")[0]}
              </span>
              <button className="nav-btn nav-btn-ghost" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <NavLink to="/signup">
                <button className="nav-btn nav-btn-solid">Sign Up</button>
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;