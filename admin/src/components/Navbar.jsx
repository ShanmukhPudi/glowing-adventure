import { Link, useNavigate} from "react-router-dom"
import {useAuth} from "../context/AuthContext"

const Navbar = () => {
    const {admin, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav style={styles.nav}>
            <h2 style={styles.brand}>Atlantis Admin</h2>
            {admin && (
                <div style={styles.links}>
                    <Link to="/hotels" style={styles.link}>Hotels</Link>
                    <Link to="/bookings" style={styles.link}>Bookings</Link>
                    <button onClick={handleLogout} style={styles.button}>Logout</button>
                </div>
            )}
        </nav>
    );
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space_between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#1a1a2e",
        color: "white",
    },

    brand: { margin: 0, color: "#e94560" },
    links: { display: "flex", gap: "1.5rem", alignItems: "center" },
    link: {color: "white", textDecoration: "none", fontSize: "1rem"},
    button: {
        backgroundColor: "#e94560",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "1rem",
    },
};

export default Navbar;